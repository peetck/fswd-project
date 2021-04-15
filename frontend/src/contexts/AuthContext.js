import { useState, createContext, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

import { LOGIN_MUTATION } from "../graphql/mutations/login";
import { REGISTER_MUTATION } from "../graphql/mutations/register";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(["fswd-token"]);

  const [login] = useMutation(LOGIN_MUTATION);
  const [register] = useMutation(REGISTER_MUTATION);

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

      setCookie("fswd-token", response?.data?.login?.token);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    removeCookie("fswd-token");
  };

  const handleRegister = async (username, password) => {
    try {
      await register({
        variables: { username: username, password: password },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        token: cookies["fswd-token"],
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
