import { InputBox, ButtonBox } from "./componentIndex.js";
import { useForm } from "react-hook-form";
import { api } from "../utils/axiosApi.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTask } from "../store/taskSlice.js";
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";

function UpdateTask({ taskDetails, toClose }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeDivRef = useRef();

  function closeAddTask(e) {
    if (closeDivRef.current == e.target) {
      toClose();
    }
  }

  const updateHandler = (data) => {
    api
      .put(`/tasks/${taskDetails._id}`, {
        title: data.task.title,
        taskStatus: data.task.taskstatus,
        description: data.task.description,
      })
      .then((res) => {
        // console.log(res);
        dispatch(
          updateTask({
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
          <form action={handleSubmit(updateHandler)}>
            <InputBox
              label="Task: "
              placeholder="add task"
              props={{
                ...register("task.title"),
                defaultValue: taskDetails.title,
              }}
            />
            <select
              name="taskStatus"
              id="taskStatus"
              {...register("task.taskstatus")}
              defaultValue={taskDetails.taskStatus}
            >
              <option value="not-started">Not Started</option>
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <textarea
              name="description"
              id="description"
              {...register("task.description")}
              defaultValue={taskDetails.description}
            ></textarea>
            <ButtonBox text="Update Task" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTask;
