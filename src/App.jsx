
import './App.css'

import ProjectCard from './components/ProjectCard'

function App() {


  return (
    <>
<ProjectCard/>
    
    </>
  )
}

export default App
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addProject,
//   deleteProject,
//   selectProject
// } from "../projectSlice";

// function ProjectCard() {
//   const dispatch = useDispatch();
//   const projects = useSelector((state) => state.projects.projects);
//   const selectedProject = useSelector(
//     (state) => state.projects.selectedProject
//   );

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleAdd = () => {
//     if (!title) return;

//     dispatch(
//       addProject({
//         title,
//         description
//       })
//     );

//     setTitle("");
//     setDescription("");
//   };

//   return (
//     <div className="flex flex-col items-center px-6 py-12">
//       {/* FORM CARD */}
//       <div className="w-full max-w-sm border border-gray-700 rounded-xl p-6 bg-gray-900 shadow-lg space-y-4">

//         <input
//           className="w-full p-2 rounded bg-white/5 text-white"
//           placeholder="Project title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <textarea
//           className="w-full p-2 rounded bg-white/5 text-white"
//           placeholder="Project description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <button
//           onClick={handleAdd}
//           className="w-full bg-indigo-500 text-white py-2 rounded"
//         >
//           Add Project
//         </button>
//       </div>

//       {/* PROJECT LIST */}
//       <div className="w-full max-w-sm mt-6 space-y-3">
//         {projects.map((project) => (
//           <div
//             key={project.id}
//             className="border border-gray-700 p-3 rounded bg-gray-800 text-white flex justify-between"
//           >
//             <div
//               onClick={() => dispatch(selectProject(project))}
//               className="cursor-pointer"
//             >
//               <p className="font-bold">{project.title}</p>
//               <p className="text-sm text-gray-400">
//                 {project.description}
//               </p>
//             </div>

//             <button
//               onClick={() => dispatch(deleteProject(project.id))}
//               className="text-red-400"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* SELECTED PROJECT */}
//       {selectedProject && (
//         <div className="mt-6 p-4 border border-indigo-500 rounded text-white">
//           <h2 className="font-bold">Selected Project</h2>
//           <p>{selectedProject.title}</p>
//           <p className="text-gray-400">{selectedProject.description}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProjectCard;