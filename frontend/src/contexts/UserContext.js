import { useState, createContext, useContext, useEffect } from "react";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

import { LOGIN_MUTATION } from "../graphql/mutations/login";
import { REGISTER_MUTATION } from "../graphql/mutations/register";

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  // กลับมาเปลี่ยน วิธีการ query
  const [fetchCart, { data: cart, refetch: refetchCart }] = useLazyQuery(
    gql`
      query($_id: MongoID!) {
        customerUser(_id: $_id) {
          cart {
            _id
            totalPrice
            products {
              productId
              quantity
              color
              size
              product {
                title
                price
                images
                type
                ... on PromotionProduct {
                  percent
                  priceAfterDiscount
                }
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        _id: user?._id,
      },
    }
  );

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  // console.log(cart);

  const [cookies, setCookie, removeCookie] = useCookies(["fswd-token"]);

  const [login] = useMutation(LOGIN_MUTATION);
  const [register] = useMutation(REGISTER_MUTATION);
  const [updateCart] = useMutation(gql`
    mutation($_id: MongoID!, $products: [UpdateByIdCartProductsInput!]!) {
      updateCart(_id: $_id, record: { products: $products }) {
        recordId
      }
    }
  `);

  useEffect(() => {
    const token = cookies["fswd-token"];
    if (token) {
      const data = jwt_decode(token);
      if (Date.now() < data.exp * 1000) {
        setUser(data);
      } else {
        removeCookie("fswd-token");
      }
    }
  }, [cookies, removeCookie]);

  const handleLogin = async (username, password) => {
    try {
      const response = await login({
        variables: { username: username, password: password },
      });

      setCookie("fswd-token", response?.data?.login?.token, { path: "/" });
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
    removeCookie("fswd-token", { path: "/" });
  };

  const handleRegister = async (username, password, email, address) => {
    try {
      await register({
        variables: { username, password, email, address },
      });
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateCart = async (
    productId,
    quantity,
    color,
    size,
    replace
  ) => {
    try {
      console.log(productId, quantity, color, size, replace);
      const products = cart?.customerUser?.cart?.products.map((prod) => ({
        productId: prod.productId,
        color: prod.color,
        size: prod.size,
        quantity: prod.quantity,
      }));

      const productIndex = products.findIndex(
        (prod) =>
          prod.productId === productId &&
          prod.color === color &&
          prod.size === size
      );

      if (productIndex !== -1) {
        if (replace && quantity > 0) {
          products[productIndex] = {
            ...products[productIndex],
            quantity: quantity,
          };
        } else if (!replace && products[productIndex].quantity + quantity > 0) {
          products[productIndex] = {
            ...products[productIndex],
            quantity: products[productIndex].quantity + quantity,
          };
        } else {
          products.splice(productIndex, 1);
        }
      } else {
        products.push({
          productId: productId,
          color: color,
          size: size,
          quantity: quantity,
        });
      }

      await updateCart({
        variables: {
          _id: cart?.customerUser?.cart?._id,
          products: products,
        },
      });
      await refetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        token: cookies["fswd-token"],
        cart: cart?.customerUser?.cart,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        updateCart: handleUpdateCart,
        refetchCart: refetchCart,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContext;
