import React, { useLayoutEffect, useState } from "react";
import { api } from "../utils/axiosApi";
import { TaskBox, AddTask, BorderBox } from "../components/componentIndex.js";
import { useSelector, useDispatch } from "react-redux";
import { loadTasks } from "../store/taskSlice.js";
import { IoMdAddCircleOutline } from "react-icons/io";

function Dashboard() {
  const allTasks = useSelector((store) => store.todo.tasks);
  const dispatch = useDispatch();
  const [addTaskShow, setAddTaskShow] = useState(false);

  const addTaskHandler = () => setAddTaskShow(true);

  useLayoutEffect(() => {
    api
      .get("/tasks")
      .then((res) => {
        dispatch(loadTasks(res.data.data));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="h-[68vh] overflow-y-auto rounded-xl my-2">
      <div className="columns-3 gap-2">
        {allTasks.map((item) => {
          return (
            <div key={item._id} className="break-inside-avoid mb-2">
              <BorderBox
                className={`bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition`}
              >
                <TaskBox
                  _id={item._id}
                  taskStatus={item.taskStatus}
                  title={item.title}
                  description={item.description}
                />
              </BorderBox>
            </div>
          );
        })}

        <div onClick={addTaskHandler} className="break-inside-avoid mb-2">
          <BorderBox
            className={`max-h-64 flex justify-center items-center min-h-[140px] bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-150 cursor-pointer transition`}
          >
            <IoMdAddCircleOutline size={40} className="text-white" />
          </BorderBox>
        </div>
      </div>

      {addTaskShow && <AddTask toClose={() => setAddTaskShow(false)} />}
    </div>
  );
}

export default Dashboard;
