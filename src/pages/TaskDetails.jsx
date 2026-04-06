import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = useSelector((state) =>
    state.tasks.tasks.find((t) => t.id === id)
  );

  const container = useRef();

  useGSAP(() => {
    gsap.fromTo(
      container.current,
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5 }
    );

    gsap.from(".text-item", {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.4,
    });
  });

  if (!task) return <div>Task not found</div>;

  return (
    <div
  ref={container}
  className="min-h-screen flex justify-center items-center bg-white p-6"
>
  <div className="card w-full max-w-md p-5 rounded-xl bg-gray-900 border border-gray-700 shadow-lg hover:shadow-gray-400 hover:border-gray-500 transition hover:-translate-y-2"
  >

    <p className="text-2xl text-white font-bold">Title:</p>
    <h3 className="text-lg tracking-wide text-gray-300 ml-5 mb-3">
      {task.title}
    </h3>


    <p className="text-2xl text-white font-bold">Details:</p>
    <p className="text-gray-400 mt-2 ml-5 mb-3">
      {task.description || "No description"}
    </p>


    <p className="text-2xl text-white font-bold">Status:</p>
    <p className="text-gray-400 mt-2 ml-5 mb-4">
      {task.status}
    </p>


    <button
      onClick={() => navigate(-1)}
      type="button"
      className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-400 mt-3"
    >
      ← Back
    </button>
  </div>
</div>
  );
}