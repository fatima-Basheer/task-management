import { createSlice, nanoid } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [
      {
        id: nanoid(),
        title: "E-commerce",
        assignTo: "Amna Ahmad Maryum",
        status: "todo",
        description: "Using HTML,CSS,JS,React,React Router,Gsap,Tailwind CSS",
      },
      {
        id: nanoid(),
        title: "Chatting App",
        assignTo: "Amna Ahmad Maryum",
        status: "in-progress",
        description: "Using HTML,CSS,JS,React,React Router,Gsap,Tailwind CSS",
      },
      {
        id: nanoid(),
        title: "Task Management",
        assignTo: "Amna Ahmad Maryum",
        status: "todo",
        description: "Using HTML,CSS,JS,React,React Router,Gsap,Tailwind CSS",
      },
      {
        id: nanoid(),
        title: "Uber",
        assignTo: "Amna Ahmad Maryum",
        status: "done",
        description: "Using HTML,CSS,JS,React,React Router,Gsap,Tailwind CSS",
      },
      {
        id: nanoid(),
        title: "Rills",
        assignTo: "Amna Ahmad Maryum",
        status: "in-progress",
        description: "Using HTML,CSS,JS,React,React Router,Gsap,Tailwind CSS",
      },
    ],
  },
  reducers: {
    moveTask: (state, action) => {
      const { id, status } = action.payload;

      const task = state.tasks.find((t) => t.id === id);
      if (task) task.status = status;
    },
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((pro) => pro.id !== action.payload);
    },
  },
});

export const { moveTask, addTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
