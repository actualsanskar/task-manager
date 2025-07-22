import { Task } from "../model/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// POST /tasks → Create a new task
// GET /tasks → Get all tasks for the logged-in user
// GET /tasks/:id → Get a specific task
// PUT /tasks/:id → Update a task
// DELETE /tasks/:id → Delete a task


const addTask = asyncHandler(async (req, res, next) => {
    const { title, description, taskStatus } = req.body;


    if (!title) throw new ApiError(401, "title is required!");

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

});

const specificTask = asyncHandler(async (req, res, next) => {

});

const updateTask = asyncHandler(async (req, res, next) => {

});

const deleteTask = asyncHandler(async (req, res, next) => {

});

export {
    addTask,
    allTasks,
    specificTask,
    updateTask,
    deleteTask
}
