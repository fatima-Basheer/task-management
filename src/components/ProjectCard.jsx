import { useState, useRef } from "react";
import { IoAddSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProject,
  deleteProject,
  selectProject,
} from "../features/projectsSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

function ProjectCard() {
  const cardRefs = useRef({});
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const containerRef = useRef(null);
  const handleRemove = (id, el) => {
    gsap.to(el, {
      duration: 0.25,
      rotationY: 90,
      scale: 0.8,
      opacity: 0,
      y: -10,
      ease: "power2.inOut",
      onComplete: () => {
        dispatch(deleteProject(id));
      },
    });
  };

useGSAP(() => {
  gsap.utils.toArray(".card").forEach((card) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 20,
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 3,
        },
      }
    );
  });
}, [projects]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addProject({ title, details }));

    setTitle("");
    setDetails("");
    setShow(false);
  };

  return (
    <>
      <div className="flex justify-end p-4">
        <button
          onClick={() => setShow(!show)}
          className="block md:hidden font-semibold p-1 left-3 w-20 flex border-1 justify-center align-middle"
        >
          <IoAddSharp className="text-black h-5 w-5" />
          Add
        </button>

        <button
          onClick={() => setShow(!show)}
          className="hidden md:block text-gray-700 bg-gray-100 font-bold text-2xl border-2 rounded-full px-4 py-2 hover:text-white hover:bg-black hover:border-black hover:cursor-pointer"
        >
          Add new Project
        </button>
      </div>

      <div className="flex flex-col px-6 py-12 lg:px-8">
        {show && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-sm border border-gray-700 rounded-xl p-6 bg-gray-900 shadow-lg relative">
              <button
                onClick={() => setShow(false)}
                className="absolute right-3 top-3 text-white"
              >
                <RxCross1 className="font-bold text-2xl hover:scale-110 hover:cursor-pointer " />
              </button>

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
                  className="w-full bg-indigo-600 py-2 rounded-md text-white hover:bg-indigo-400 hover:cursor-pointer"
                >
                  Add Project
                </button>
              </form>
            </div>
          </div>
        )}

        <div
          ref={containerRef}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-white"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[project.id] = el)}
              className="card p-4 rounded-xl bg-white border shadow-lg hover:shadow-gray-500"
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
                onClick={() =>
                  handleRemove(project.id, cardRefs.current[project.id])
                }
                className="w-10 md:w-15 absolute right-3 top-2 bg-purple-700 py-2 rounded-md hover:bg-purple-400 flex justify-center text-center"
              >
                <RxCross1 className="text-2xl" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
