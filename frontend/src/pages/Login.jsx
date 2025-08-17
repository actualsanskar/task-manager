import React from "react";
import { InputBox, ButtonBox, BorderBox } from "../components/componentIndex.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice.js";
import { api } from "../utils/axiosApi.js";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.auth.authStatus);

  const loginHandler = (data) => {
    api
      .post("/auth/login", {
        email: data.login.email,
        password: data.login.password,
      })
      .then((response) => {
        dispatch(login(response.data.data));
        console.log(response.data.message);
        console.log(response.data.success);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {isAuth ? (
        <Navigate to="/tasks" />
      ) : (
        <div className="w-full h-[100%] rounded-xl flex items-center justify-center bg-gray-900 font-inter">
          <BorderBox
            className={`flex flex-col p-8 bg-gray-800 rounded-2xl shadow-2xl text-white max-w-md w-full mx-auto`}
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white tracking-wide">
                Welcome back!
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Sign in to your account
              </p>
            </div>
            <form onSubmit={handleSubmit(loginHandler)} className="space-y-6">
              <InputBox
                label="Email"
                type="email"
                placeholder="enter your email"
                props={{
                  ...register("login.email"),
                  className:
                    "p-4 w-full bg-gray-700 border-2 border-transparent text-white rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder-gray-500",
                }}
              />
              <InputBox
                label="Password"
                type="password"
                placeholder="password"
                props={{
                  ...register("login.password"),
                  className:
                    "p-4 w-full bg-gray-700 border-2 border-transparent text-white rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder-gray-500",
                }}
              />
              <ButtonBox
                type="submit"
                text="Login"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg transform transition-transform duration-200 hover:scale-[1.02] active:scale-95"
              />
            </form>
          </BorderBox>
        </div>
      )}
    </>
  );
}

export default Login;