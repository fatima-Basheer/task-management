
import { createSlice, nanoid } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [
      { id: nanoid(), title: "E-commerce", status: "todo" },
      { id: nanoid(), title: "Chatting App", status: "in-progress" },
        { id: nanoid(), title: "Task Management", status: "todo" },
      { id: nanoid(), title: "Uber", status: "done" },
      { id: nanoid(), title: "Rills", status: "in-progress" },
    ],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: nanoid(),
        title: action.payload,
        status: "todo",
      });
    },

    moveTask: (state, action) => {
      const { id, status } = action.payload;

      const task = state.tasks.find((t) => t.id === id);
      if (task) task.status = status; 
    },
  },
});

export const { addTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;