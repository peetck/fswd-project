import { useState, createContext, useContext, useEffect } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

import { LOGIN_MUTATION } from "../graphql/mutations/login";
import { REGISTER_MUTATION } from "../graphql/mutations/register";
import { UPDATE_PRODUCT_IN_CART_MUTATION } from "../graphql/mutations/updateProductInCart";

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const { data: cart, refetch } = useQuery(
    gql`
      query($_id: MongoID!) {
        customerUser(_id: $_id) {
          cart {
            productId
            quantity
            product {
              title
              price
              images
              type
              percent
              finalPrice
            }
          }
        }
      }
    `,
    {
      variables: {
        _id: user?._id,
      },
      fetchPolicy: "network-only",
    }
  );

  const [cookies, setCookie, removeCookie] = useCookies(["fswd-token"]);

  const [login] = useMutation(LOGIN_MUTATION);
  const [register] = useMutation(REGISTER_MUTATION);
  const [updateProductInCart] = useMutation(UPDATE_PRODUCT_IN_CART_MUTATION);

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
      console.log(error.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    removeCookie("fswd-token", { path: "/" });
  };

  const handleRegister = async (
    username,
    password,
    email,
    addresses,
    gender
  ) => {
    try {
      await register({
        variables: { username, password, email, addresses, gender },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateCart = async (productId, quantity, replace) => {
    try {
      await updateProductInCart({
        variables: {
          userId: user._id,
          productId: productId,
          quantity: +quantity,
          replace: replace,
        },
      });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        token: cookies["fswd-token"],
        cart: cart?.customerUser?.cart ?? [],
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        updateCart: handleUpdateCart,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContext;
