import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  //for the navigation
  const navigate = useNavigate();

  //for form
  const [loginForm, setLoginForm] = useState({
    phonenumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginForm({ ...loginForm, [name]: value });
  };


  const handlelogin = async (e)=>{

    e.preventDefault();

    if (!loginForm.phonenumber || !loginForm.password) {
      alert("Please fill in all fields");
      return;
    }

    // eslint-disable-next-line no-undef
    const response = await fetch(`https://fixitnepal.onrender.com/login`,{
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify(loginForm)
    })

    const data = await response.json();

    if (response.ok) {
        // Store the token (if your backend sends one)
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role)
        localStorage.setItem("userId", data.userId); 
        
        //navigate role base 
        navigate(data.role === "Customer" ? "/userdashboard": data.role === "Garage" ? "/servicecenter" : data.role === "Mechanic " ?  "/machine" : "SuperAdmin")
      } 
  };


    
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="shadow-2xl rounded-2xl p-8 w-[350px] bg-white">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <span className="text-3xl font-extrabold text-orange-400">FIX</span>
          <span className="text-2xl font-bold">IT</span>
          <span className="text-3xl font-extrabold text-green-400 ">
            {" "}
            Nepal
          </span>
          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <div>
            <label className="font-semibold">Phone Number</label>
            <input
             name="phonenumber"
              type="text"
              placeholder="Enter your username"
              className="w-full mt-1 p-2 rounded-xl bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
              value={loginForm?.phonenumber}
            />
          </div>

          <div>
            <label className="font-semibold">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-2 rounded-xl bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={handleChange}
              value={loginForm?.password}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            onClick={handlelogin}
          >
            Login
          </button>
        </form>

        {/* Extra */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            className="font-semibold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};
