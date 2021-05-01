import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { useUserContext } from "../contexts/UserContext";
import Button from "../components/Button";
import Input from "../components/Input";

const LoginPage = (props) => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      toast.success("You are successfully logged in");
      history.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col container mx-auto px-4 h-full mt-20">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-center my-5 font-bold text-4xl uppercase">
                Login
              </div>
              <form onSubmit={handleLogin}>
                <div className="relative w-full mb-7 pt-6">
                  <Input
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    required
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
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="text-center mt-10">
                  <Button type="submit">Login</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
