import { Header, BorderBox } from "./components/componentIndex.js";
import { Link, Outlet, useLocation } from "react-router-dom";
import { api } from "./utils/axiosApi.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice.js";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const isDashboard = location.pathname === "/tasks";

  useEffect(() => {
    api
      .post("/account")
      .then((res) => {
        dispatch(login(res.data.data));
        navigate("/tasks");
        // console.log(res);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <BorderBox
          className={`bg-gray-100 h-[85vh] w-10/12 flex flex-col pb-1.5`}
        >
          <BorderBox className="bg-blue-900 text-white">
            <Header />
          </BorderBox>
          <div
            className={
              isDashboard
                ? ""
                : "flex-1 overflow-auto flex items-center justify-center mt-2.5"
            }
          >
            <Outlet />
          </div>
          <div className="text-center text-xs text-gray-400 bg-gray-700 rounded-2xl">
            <span>Created by: </span>
            <a
              href="https://www.linkedin.com/in/actualsanskar/"
              className="text-gray-300 hover:text-white transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sanskar Agarwal
            </a>
          </div>
        </BorderBox>
      </div>
    </>
  );
}

export default App;
