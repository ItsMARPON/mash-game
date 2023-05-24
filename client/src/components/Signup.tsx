import React, { useState } from "react";
// import "./Signup.css";
import {Link} from 'react-router-dom';
// Import mutation and ADD_USER mutations.js
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

// import Auth from "../utils/auth";

// export interface SignupProps {
//   username: string;
//   email: string;
//   password: string;
// }

const Signup = (): JSX.Element => {
  const [userFormState, setUserFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const [addUser, {data}] = useMutation(ADD_USER);
  

  // Update the state based on user input changes to form
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormState({...userFormState, [name]: value});
  };

 
  // Handle the Submit Form
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userFormState);

    try {
      const { data } = await addUser({ variables: { ...userFormState } });

      if(data.errors?.length >0){
        console.log('Error but we made it this far');
      } else {
        console.log('This is a success');
      }

      // console.log(data);
      // Auth.login(data.addUser.token);
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="w-full max-w-xs">
      {data ? (
      <p>
          Success!
          <Link to='/home'>Go to Game</Link>
      </p>): (
      <form
        className="signup-input bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your username"
            name="username"
            type="text"
            value={userFormState.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Email
          </label>
          <input
            className="form-input shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your email"
            name="email"
            type="email"
            value={userFormState.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="form-input shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="*********"
            name="password"
            type="password"
            value={userFormState.password}
            onChange={handleChange}
          />
          <p className="text-red-500 text-xs italic">
            Please create a password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
      )}

      <p className="text-center text-gray-500 text-xs">
        &copy;2023 Project Mash. All rights reserved.
      </p>
    </div>
  );
};

export default Signup;
