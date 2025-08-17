import { InputBox, ButtonBox } from "./componentIndex.js";
import { useForm } from "react-hook-form";
import { api } from "../utils/axiosApi.js";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice.js";
import { IoMdClose } from "react-icons/io";
import { useRef } from "react";

function AddTask({ toClose }) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const closeDivRef = useRef();

  function closeAddTask(e) {
    if (closeDivRef.current == e.target) {
      toClose();
    }
  }

  const addTaskHandler = (data) => {
    api
      .post("/add-task", {
        title: data.task.title,
        taskStatus: data.task.taskstatus,
        description: data.task.description,
      })
      .then((res) => {
        // console.log(res);
        dispatch(
          addTask({
            _id: res.data.data._id,
            title: data.task.title,
            taskStatus: data.task.taskstatus,
            description: data.task.description,
          })
        );
        toClose();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div
      ref={closeDivRef}
      onClick={closeAddTask}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="text-white flex flex-col gap-1">
        <button className="place-self-end text-white" onClick={toClose}>
          <IoMdClose size={30} />
        </button>
        <div className="flex flex-col bg-gray-800 rounded-2xl p-6 shadow-2xl w-96">
          <h3 className="text-2xl font-bold text-white tracking-wide mb-4">
            Add New Task
          </h3>
          <form onSubmit={handleSubmit(addTaskHandler)} className="space-y-4">
            <InputBox
              label="Task Title"
              placeholder="Enter task title"
              props={{
                ...register("task.title"),
                className:
                  "p-3 w-full bg-gray-700 border-2 border-transparent text-white rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder-gray-500",
              }}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">
                Description
              </label>
              <textarea
                {...register("task.description")}
                placeholder="Add description"
                className="p-3 w-full bg-gray-700 border-2 border-transparent text-white rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300 placeholder-gray-500 min-h-[100px] resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">
                Status
              </label>
              <select
                {...register("task.taskstatus")}
                className="p-3 w-full bg-gray-700 border-2 border-transparent text-white rounded-xl focus:outline-none focus:border-blue-500 transition-colors duration-300"
              >
                <option value="not-started">Not Started</option>
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <ButtonBox
              text="Add Task"
              className="w-full bg-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg transform transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
