import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  projects: [
    {
      id: "1",
      title: "Task Management",
      details:
        "Using react.js, Tailwind CSS, redux toolkit and gsap for adding animation",
    },
    {
      id: "2",
      title: "Chating App",
      details:
        "Chatting apps rely on a combination of real-time protocols (WebSockets)",
    },
    {
      id: "3",
      title: "Social Media App",
      details: "Using react ,tailwind css ,gsap and mongoDB",
    },

    {
      id: "4",
      title: "Search Engine",
      details: "Using react ,tailwind css ,gsap and mongoDB",
    },
  ],
  selectedProject: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projects.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (pro) => pro.id !== action.payload,
      );
    },
    selectProject: (state, action) => {
      state.selectedProject = action.payload;
    },
  },
});

export const { addProject, deleteProject, selectProject } =
  projectsSlice.actions;
export default projectsSlice.reducer;
