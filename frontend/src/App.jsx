import { Header, BorderBox } from "./components/componentIndex.js";
import { Outlet, useLocation } from "react-router-dom";
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
        <BorderBox className={`bg-gray-100 h-[85vh] w-10/12 flex flex-col`}>
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
        </BorderBox>
      </div>
    </>
  );
}

export default App;
