import { Task } from "../model/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const addTask = asyncHandler(async (req, res, next) => {
    console.log();

    const { title, description, taskStatus } = req.body;


    if (!title) throw new ApiError(400, "title is required!");

    const task = await Task.insertOne({
        userId: req.user._id,
        title,
        description,
        taskStatus
    })

    if (!task) throw new ApiError(500, "error while adding new task");

    return res
        .status(200)
        .json(
            new ApiResponse(200, task, "task added successfully")
        )

});

const allTasks = asyncHandler(async (req, res, next) => {

    const tasks = await Task.find({ userId: req.user._id }).select("-userId -createdAt -updatedAt");

    if (!tasks) throw new ApiError(500, "error while fetching tasks");

    return res
        .status(200)
        .json(
            new ApiResponse(200, tasks, "all tasks fetched")
        )

});

const specificTask = asyncHandler(async (req, res, next) => {
    const task = await Task.findById(req.params.id);

    if (!task) throw new ApiError(500, "error while showing specific task!");

    return res
        .status(200)
        .json(
            new ApiResponse(200, task, "task fetched successfully!")
        )
});

const updateTask = asyncHandler(async (req, res, next) => {
    const { title, description, taskStatus } = req.body;

    if (!title) throw new ApiError(400, "title is required");

    const updatedTask = await Task.findOneAndUpdate({ _id: req.params.id }, {
        title,
        description,
        taskStatus
    }, { new: true })

    if (!updateTask) throw new ApiError(500, "error while updating task");

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedTask, "task updated successfully")
        )

});

const deleteTask = asyncHandler(async (req, res, next) => {

    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id });

    if (!deletedTask) throw new ApiError(500, "error while deleting task")

    return res
        .status(200)
        .json(
            new ApiResponse(200, deletedTask, "task deleted successfully!")
        )

});

export {
    addTask,
    allTasks,
    specificTask,
    updateTask,
    deleteTask
}
