import React, { useState } from "react";

import { useAuthContext } from "../contexts/AuthContext";

const RegisterPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Male");

  const { register } = useAuthContext();

  const handleRegister = async (e) => {
    e.preventDefault();

    await register(username, password, email, [address], gender);
    alert("Register Success!!");
  };

  return (
    <form onSubmit={handleRegister}>
      <p>
        Username :
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border"
        />
      </p>

      <p>
        Password :
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border"
        />
      </p>

      <p>
        Email :
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border"
        />
      </p>

      <p>
        Address :
        <textarea
          cols="30"
          rows="10"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border"
        />
      </p>

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <br />
      <br />

      <input type="submit" value="Register" />
    </form>
  );
};

export default RegisterPage;
