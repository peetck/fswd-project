import React, { useState } from "react";

import { useAuthContext } from "../contexts/AuthContext";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
    props.history.push("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-black"
      />

      <label htmlFor="password">Password: </label>
      <input
        type="text"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-black"
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

export default LoginPage;
