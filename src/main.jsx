import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DashBoard from "./pages/DashBoard.jsx";
import Projects from "./pages/Projects.jsx";
import TaskBoard from "./pages/TaskBoard.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import AppLayout from "./AppLayout.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./app/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />
      },
      {
        path: "task-board",
        element: <TaskBoard />,
      },
      {
        path: "task-board/:id",
        element: <TaskDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
