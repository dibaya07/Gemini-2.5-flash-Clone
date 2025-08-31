import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./context.jsx";

export default function AuthForm() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();
   const { isLogin, setIsLogin, token, setToken,userName,setUserName } = useContext(AuthContext);

  const handleChange = (e) => {
    try {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
         let endpoints = isSignUp ? "login" : "signUp";
    await axios
      .post(`${import.meta.env.VITE_API_URL}/user/${endpoints}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        localStorage.setItem("gemini-token", res.data.token);
        // console.log(res.data.user.username)
        setUserName(res.data.user.username)
        // setToken(res.data.token);
        setIsLogin(true);
        navigate("/");
      })
      .catch((data) => {
        console.log(data.response?.data?.message);
        setError(data.response?.data?.message);
      });
    }
    catch(err){
        console.log("login" + err)
    }
   
  };

  // useEffect(() => {
  //   console.log(isLogin)
  // }, [isLogin])
  

  return (
     <>
    <div className="bg-gray-400 h-screen  w-full flex justify-center items-center flex-col">
      <div className="signup h-fit sm:w-1/4 w-full flex flex-col items-center justify-center bg-red-400">
        <h2 className="font-semibold font-serif text-xl my-3">
          {isSignUp ? "LOGIN" : "SIGN UP"}
        </h2>
        <form
          className=" h-fit w-4/5 flex flex-col  my-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter your username"
            className={`rounded-md p-1 border border-solid border-gray-500 my-3 ${
              isSignUp ? "hidden" : "inline-block"
            }`}
            name="username"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Enter your email"
            className="rounded-md p-1 border border-solid border-gray-500 my-3"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="rounded-md p-1 border border-solid border-gray-500 my-3"
            name="password"
            onChange={handleChange}
          />
          {error != "" && (
            <h6 className="error text-red-700 font-medium text-base text-center ">
              {error}
            </h6>
          )}
          <button
            className="font-semibold font-serif text-base bg-orange-400 px-6 py-3 rounded-lg my-1"
            type="submit" onClick={()=>navigate('/')}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="login font-medium font-serif text-base flex flex-col items-center py-3">
          <span
            className="cursor-pointer underline"
            onClick={() => setIsSignUp((prev) => !prev)}
          >
            {isSignUp ? "Create new account" : "Already have a account?"}
          </span>
        </div>
      </div>
    <button onClick={()=>navigate('/')} className="bg-black text-white">Back</button>
    </div>
   </>
  );
}