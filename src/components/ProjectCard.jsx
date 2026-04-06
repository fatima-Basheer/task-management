import { useState, useRef } from "react";
import { IoAddSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProject,
  deleteProject,
  selectProject,
} from "../features/projectsSlice";

import gsap from "gsap";
import { Flip } from "gsap/Flip";


gsap.registerPlugin(Flip);

function ProjectCard() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);

  const containerRef = useRef(null);

  const animateFlip = (callback) => {
    if (!containerRef.current) return;

    const state = Flip.getState(containerRef.current.children);

    callback();

    setTimeout(() => {
      Flip.from(state, {
        duration: 0.25,
        ease: "power2",
        stagger: 0.2,
        scale: true,
        scrub: true,
      });
    }, 1);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    animateFlip(() => {
      dispatch(addProject({ title, details }));
    });

    setTitle("");
    setDetails("");
    setShow(false);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();

    animateFlip(() => {
      dispatch(deleteProject(id));
    });
  };

  return (
    <>
      <div className="flex justify-end p-4">
        <button
          onClick={() => setShow(!show)}
          className="block md:hidden font-extrabold p-2 left-3"
        >
          <IoAddSharp className="text-black h-7 w-7" />
        </button>

        <button
          onClick={() => setShow(!show)}
          className="hidden md:block text-black bg-gray-100 font-extrabold text-2xl border-2 rounded-full px-4 py-2 hover:text-white hover:bg-black"
        >
          Add new Project
        </button>
      </div>

      <div className="flex flex-col px-6 py-12 lg:px-8">
        {show && (
          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm border border-gray-700 rounded-xl p-6 bg-gray-900 shadow-lg">
            <form className="space-y-4">
              <div>
                <label className="text-sm text-gray-200">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
                />
              </div>

              <div>
                <label className="text-sm text-gray-200">Details</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="mt-1 w-full rounded-md bg-white/5 px-3 py-1.5 text-white"
                />
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="w-full bg-indigo-500 py-2 rounded-md text-white"
              >
                Add Project
              </button>
            </form>
          </div>
        )}

        <div
          ref={containerRef}
          className="card mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-white"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="card p-4 rounded-xl bg-white border shadow-lg hover:shadow-gray-500 transition hover:-translate-y-2"
            >
              <Link to={`/projects/${project.id}`}>
                <h3
                  onClick={() => dispatch(selectProject(project))}
                  className="text-gray-950 text-xl font-semibold cursor-pointer hover:underline"
                >
                  {project.title}
                </h3>
              </Link>

              <button
                onClick={(e) => handleDelete(e, project.id)}
                className="mt-15 w-full bg-purple-700 py-1.5 rounded-md hover:bg-red-400"
              >
                Delete Project
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
