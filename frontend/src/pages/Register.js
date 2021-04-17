import React, { useState } from "react";

import { useAuthContext } from "../contexts/AuthContext";

const RegisterPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const { register } = useAuthContext();

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(username, password, address);
  };

  return (
    <form onSubmit={handleRegister}>
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

      <label htmlFor="address">Address: </label>
      <input
        type="text"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border border-black"
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

export default RegisterPage;
