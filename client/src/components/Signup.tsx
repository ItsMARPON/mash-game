import React, { useState } from "react";
import { Link } from "react-router-dom";
// Import mutation and ADD_USER mutations.js
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { saveUserToken } from "../utils/localStorage";

import Auth from "../utils/auth";

const Signup = (): JSX.Element => {
  const [userFormState, setUserFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { data }] = useMutation(ADD_USER);

  // Update the state based on user input changes to form
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormState({ ...userFormState, [name]: value });
  };

  // Handle the Submit Form
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userFormState);

    try {
      const { data } = await addUser({ variables: { ...userFormState } });

      if (data.errors?.length > 0) {
        console.log("Error but we made it this far");
      } else {
        console.log("This is a success");
        saveUserToken(data.addUser.token);
        
      }

      Auth.login(data.addUser.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-xs">
      {data ? (
        <p>
          Success!
          <Link to="/home">Go to Game</Link>
        </p>
      ) : (
        <div className="w-screen">
          <div className="flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-black sm:max-w-xl border border-black">
              <h1 className="text-3xl text-black">Sign up for an account</h1>
              <form className="mt-6" onSubmit={handleFormSubmit}>
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-gray-800">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={userFormState.username}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 text-black bg-[#ededed] border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Your username"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-semibold text-gray-800">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={userFormState.email}
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
                    value={userFormState.password}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 text-black bg-[#ededed] border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mt-6">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-800">
                    Sign up
                  </button>
                </div>
              </form>

              <p className="text-red-500 text-xs italic m-2">
                Please create a password.
              </p>
            </div>
          </div>
        </div>
      )}
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 Project Mash. All rights reserved.
      </p>
    </div>
  );
};

export default Signup;
