import { BorderBox, InputBox } from "../components/componentIndex.js";
import { useForm } from "react-hook-form";
import { ButtonBox } from "../components/componentIndex.js";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../utils/axiosApi";

function SignUp() {
  const { register, handleSubmit } = useForm();
  const isAuth = useSelector((store) => store.auth.authStatus);
  const navigate = useNavigate();

  const signupHandler = (data) => {
    api
      .post("/auth/signup", {
        username: data.signup.username,
        email: data.signup.email,
        password: data.signup.password,
      })
      .then((response) => {
        navigate("/login");
      });
  };

  return (
    <>
      {isAuth ? (
        <Navigate to="/tasks" />
      ) : (
        <div className="w-full h-[100%] rounded-xl flex items-center justify-center bg-gray-900 font-inter">
          <BorderBox
            className={`flex flex-col p-6 bg-gray-800 rounded-2xl shadow-2xl text-white max-w-md w-full mx-auto`}
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white tracking-wide">
                Register with us!
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Let's try to make our life a little more organised
              </p>
            </div>
            <form onSubmit={handleSubmit(signupHandler)} className="space-y-6">
              <InputBox
                label="username"
                type="text"
                placeholder="username"
                props={{
                  ...register("signup.username"),
                  className:
                    "p-4 w-full bg-gray-700 border-2 border-transparent text-white rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder-gray-500",
                }}
              />
              <InputBox
                label="Email"
                type="email"
                placeholder="enter your email"
                props={{
                  ...register("signup.email"),
                  className:
                    "p-4 w-full bg-gray-700 border-2 border-transparent text-white rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder-gray-500",
                }}
              />
              <InputBox
                label="Password"
                type="password"
                placeholder="password"
                props={{
                  ...register("signup.password"),
                  className:
                    "p-4 w-full bg-gray-700 border-2 border-transparent text-white rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder-gray-500",
                }}
              />
              <ButtonBox
                type="submit"
                text="Sign Up"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg transform transition-transform duration-200 hover:scale-[1.02] active:scale-95"
              />
            </form>
          </BorderBox>
        </div>
      )}
    </>
  );
}

export default SignUp;
