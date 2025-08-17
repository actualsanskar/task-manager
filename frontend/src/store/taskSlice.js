import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tasks: [{
        _id: 1,
        title: "demo task",
        description: "demo description",
        taskStatus: "done"
    }],
    addTaskComponentStatus: false
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            console.log(action);
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) =>
                task._id != action.payload
            )
        },
        updateTask: (state, action) => {
            state.tasks = state.tasks.map((task) =>
                task._id == action.payload._id ? {
                    ...task,
                    title: action.payload.title,
                    description: action.payload.description,
                    taskStatus: action.payload.taskStatus
                } : task
            )
        },
        loadTasks: (state, action) => {
            state.tasks = action.payload
        },

    }
})

export const { addTask, updateTask, deleteTask, loadTasks } = taskSlice.actions

export default taskSlice.reducer