import React, { useState } from "react";

import { useUserContext } from "../contexts/UserContext";
import Button from "../components/Button";
import Input from "../components/Input";

const RegisterPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Male");

  const { register } = useUserContext();

  const handleRegister = async (e) => {
    e.preventDefault();

    await register(username, password, email, [address], gender);
    alert("Register Success!!");
  };

  return (
    <div className="flex flex-col container mx-auto px-4 h-full mt-20">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-center my-5 font-bold text-4xl uppercase">
                Register
              </div>
              <form onSubmit={handleRegister}>
                <div className="relative w-full mb-7 pt-6">
                  <Input
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="relative w-full mb-7">
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="relative w-full mb-7">
                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="relative w-full mb-7">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative w-full mb-7">
                  <Input
                    label="Address"
                    type="textarea"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="relative w-full mb-7">
                  <Input
                    label="Gender"
                    type="select"
                    name="gender"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Input>
                </div>

                <div className="text-center mt-10">
                  <Button onClick={handleRegister}>Register</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
