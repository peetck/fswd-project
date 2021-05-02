import { useState, createContext, useContext, useEffect } from "react";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

import Loader from "../components/Loader";

const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    login(record: { username: $username, password: $password }) {
      token
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation(
    $username: String!
    $password: String!
    $email: String!
    $address: String!
  ) {
    createCustomerUser(
      record: {
        username: $username
        password: $password
        email: $email
        address: $address
      }
    ) {
      recordId
    }
  }
`;

const UPDATE_CART_MUTATION = gql`
  mutation($_id: MongoID!, $products: [UpdateByIdCartProductsInput!]!) {
    updateCart(_id: $_id, record: { products: $products }) {
      recordId
    }
  }
`;

const CUSTOMER_USER_QUERY = gql`
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
            stock {
              quantity
              color
              size
            }
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
`;

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(["fswd-token"]);

  const [login] = useMutation(LOGIN_MUTATION);
  const [register] = useMutation(REGISTER_MUTATION);
  const [updateCart] = useMutation(UPDATE_CART_MUTATION);

  const [
    fetchCart,
    { data: cart, loading, error: errorCart, refetch: refetchCart },
  ] = useLazyQuery(CUSTOMER_USER_QUERY, {
    variables: {
      _id: user?._id,
    },
  });

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

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
      toast.error(error.message);
    }
  };

  if (errorCart) {
    toast.error(errorCart.message);
  }

  if (loading) {
    return (
      <div className="flex flex-1 justify-center items-center w-screen h-screen">
        <Loader />
      </div>
    );
  }

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
