import { useState, createContext, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";

import { LOGIN_MUTATION } from "../graphql/mutations/login";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(["fswd-token"]);

  const [login] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (username, password) => {
    try {
      const response = await login({
        variables: { username: username, password: password },
      });

      setUser(response?.data?.login?.user);
      setCookie("fswd-token", response?.data?.login?.token);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    removeCookie("fswd-token");
  };

  // const register = () => {};

  return (
    <AuthContext.Provider
      value={{
        user: user,
        token: cookies["fswd-token"],
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
