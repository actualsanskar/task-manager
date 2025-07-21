import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    taskStatus: {
        type: String,
        enum: ['planning', 'in-progress', 'done'],
        default: 'planning',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {timestamps: true});

export const Task = mongoose.model("Task", taskSchema)