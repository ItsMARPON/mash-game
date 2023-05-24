import React, { useState} from "react";
import "./Signup.css";
// import { Link } from "react-router-dom";

export interface SignupProps {
  // userFormState: string;
  // setUserFormState: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  email: string;
  password: string;
}

const Signup = ({ name, email, password }: SignupProps) => {
  const [userFormState, setUserFormState] = useState({
    name: "",
    email: "",
    password: "",
  });


  // Update the state based on user input changes to form
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;


    setUserFormState({
      ...userFormState,
      [name]: value,
    });
  };

  // Handle the Submit Form
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const data = {
      name: userFormState.name,
      email: userFormState.email,
      password: userFormState.password,
    };
  };

  // setUserFormState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  return (
    <div className="w-full max-w-xs">
      <form
        className="signup-input bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleFormSubmit}>
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
            name="name"
            type="text"
            value={userFormState.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
        <p className="text-red-500 text-xs italic">Please create a password.</p>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sign up
        </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 Project Mash. All rights reserved.
      </p>
    </div>
  );
};

export default Signup;
