import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { saveUserToken } from "../utils/localStorage";
// import Auth from "../utils/auth";

const Login = (): JSX.Element => {
 
  const [userData, setUserData] = useState({email: '', password: ''});
  const [loginError, setLoginError] = useState("");

  const [login, {data}] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await login({ variables: { ...userData} });

      if (data.errors?.length > 0) {
        
        console.log("error")
      } else {
        console.log("This is a success");
        saveUserToken(data.login.token)
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
    <section className="w-screen">
      
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow-2xl shadow-black dark:border md:mt-0 sm:max-w-md bg-gray-500">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Log in to your account
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={userData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start"></div>
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-white">
                Dont have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </a>
              </p>
              {loginError.length ? <p>{loginError}</p> : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
