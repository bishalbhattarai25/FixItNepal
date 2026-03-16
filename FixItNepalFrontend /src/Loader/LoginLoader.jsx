import React from "react";

const AuthLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">

        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <h1 className="mt-4 text-2xl font-bold">
          <span className="text-black">FIX</span>
          <span className="text-red-500">IT</span> Nepal
        </h1>

        <p className="text-gray-500 mt-1">
          Verifying your account...
        </p>

      </div>
    </div>
  );
};

export default AuthLoader;