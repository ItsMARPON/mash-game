import React from "react";
import howto from "../assets/images/pexels-wallsio-15505432.jpg";

const How = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="desc-container w-full p-4 shadow-md lg:max-w-lg bg-sky-500 ">
        <div
          className="w-full h-48"
          style={{
            backgroundImage: `url(${howto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="space-y-2 text-xl font-semibold tracking-tight text-red-700">
          <h2>How to Play:</h2>
        </div>
        <p className="text-gray-600"></p>
        <ul>1. Enter in 3 options for each category.</ul>
        <ul>2. Hit Submit Button.</ul>
        <ul>
          3. Share the results you love to your friends and get them involved in
          your stories.
        </ul>
      </div>
    </div>
  );
};

export default How;
