// commmit comment
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { saveUserToken } from "../utils/localStorage";
// import Auth from "../utils/auth";

const Login = (): JSX.Element => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [login, { data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await login({ variables: { ...userData } });

      if (data.errors?.length > 0) {
        console.log("error");
      } else {
        console.log("This is a success");
        saveUserToken(data.login.token);
        setLoginError("");
        navigate("/");
        window.location.reload();
      }
      console.log(data);
    } catch (err) {
      setLoginError("Error with credentials, please try again");
    }
  };

  return (
    <div className="w-screen">
      <div className="flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black sm:max-w-xl border border-black">
          <h1 className="text-3xl text-black">Sign in to your account</h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={userData.email}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-black bg-[#ededed] border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="name@company.com"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={userData.password}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-black bg-[#ededed] border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-800">
                Login
              </button>
            </div>
            {loginError.length ? <p>{loginError}</p> : null}
          </form>

          <p className="mt-8 text-xs font-light text-center text-black">
            {" "}
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-black hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
