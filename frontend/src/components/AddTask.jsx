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
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="text-black flex flex-col gap-1">
        <button className="place-self-end" onClick={toClose}>
          <IoMdClose size={30} />
        </button>
        <div className="flex flex-col items-center bg-white rounded-3xl p-4 shadow">
          <form action={handleSubmit(addTaskHandler)}>
            <InputBox
              label="Task: "
              placeholder="add task"
              props={{ ...register("task.title") }}
            />

            <label htmlFor="descpt">Description: </label>
            <textarea
              name="description"
              id="descpt"
              {...register("task.description")}
              placeholder="add description"
            ></textarea>
            <div>
              <select
                name="taskStatus"
                id="taskStatus"
                {...register("task.taskstatus")}
              >
                <option value="not-started">Not Started</option>
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <ButtonBox className="w-full" text="Add Task" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
