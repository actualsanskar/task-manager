import { useState } from "react";
import { UpdateTask } from "../components/componentIndex.js";
import { api } from "../utils/axiosApi.js";
import { useDispatch } from "react-redux";
import { deleteTask } from "../store/taskSlice.js";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function TaskBox({ _id, taskStatus, title, description }) {
  const dispatch = useDispatch();
  const [updateTaskShow, setUpdateTaskShow] = useState(false);

  const handleDeleteTask = () => {
    api.delete(`/tasks/${_id}`).then((res) => {
      dispatch(deleteTask(_id));
    });
  };

  const taskStatusColor = {
    "not-started": "bg-gray-700 text-white",
    planning: "bg-yellow-500/80 text-white",
    "in-progress": "bg-blue-500/80 text-white",
    done: "bg-green-500/80 text-white",
  };

  return (
    <div className="bg-gray-800 p-2 rounded-2xl shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-xl font-bold text-white">{title}</h4>
        <div className="flex gap-3">
          <button
            onClick={() => setUpdateTaskShow(true)}
            className="text-gray-400 transition-colors duration-200 cursor-pointer"
          >
            <FaRegEdit size={20} />
          </button>
          <button
            onClick={handleDeleteTask}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
          >
            <MdDeleteOutline size={22} />
          </button>
        </div>
      </div>
      <p className="text-gray-400 mb-4 text-sm">{description}</p>
      <div
        className={`inline-block px-3 py-1 rounded-xl text-sm font-medium ${taskStatusColor[taskStatus]}`}
      >
        {taskStatus}
      </div>
      {updateTaskShow && (
        <UpdateTask
          taskDetails={{
            _id,
            taskStatus,
            title,
            description,
          }}
          toClose={() => setUpdateTaskShow(false)}
        />
      )}
    </div>
  );
}

export default TaskBox;
