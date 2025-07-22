import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    taskStatus: {
        type: String,
        enum: ['not-started','planning', 'in-progress', 'done'],
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    }
}, {timestamps: true});

export const Task = mongoose.model("Task", taskSchema)