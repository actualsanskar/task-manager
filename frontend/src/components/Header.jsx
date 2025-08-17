import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../pages/pagesIndex.js";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AddTask } from "./componentIndex.js";

function Header() {
  const isAuth = useSelector((store) => store.auth.authStatus);
  // added this to control wheather add task should be shown or not.
  const [addTaskShow, setAddTaskShow] = useState(false);

  return (
    <div className="flex justify-between h-auto bg-blue-900">
      <h1 className="text-5xl font-extrabold">Task Manager</h1>

      <div className="mt-2 mr-2">
        {!isAuth && (
          <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </div>
        )}

        {isAuth && (
          <div className="flex gap-2">
            <div onClick={() => setAddTaskShow(true)}>
              <IoMdAddCircleOutline size={30} />
            </div>
            <Logout />
          </div>
        )}
      </div>
      {addTaskShow && <AddTask toClose={() => setAddTaskShow(false)} />}
    </div>
  );
}

export default Header;
