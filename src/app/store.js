import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../features/projectsSlice";
import tasksReducer from "../features/tasksSlice"
const store = configureStore({
  reducer: {
    projects: projectReducer,
    tasks: tasksReducer,
  },
});

export default store;