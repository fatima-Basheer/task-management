import { Link } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IoHome } from "react-icons/io5";
import { IoFolderOpenOutline } from "react-icons/io5";
import { FiClipboard } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
function Sidebar({ isOpen, setIsOpen }) {
  const itemsRef = useRef([]);

  useGSAP(() => {
    const items = itemsRef.current;

    if (isOpen) {
      gsap.set(items, { x: -20, opacity: 0 });

      gsap.to(items, {
        x: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.35,
        ease: "power2.out",
        delay: 0.1,
      });
    }
  }, [isOpen]);

  return (
    <div
      className={`h-screen bg-gray-900 text-gray-200 flex flex-col p-2 overflow-hidden transition-all duration-700 z-50 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="p-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl hover:cursor-pointer"
        >
          <FiMenu />
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-4 gap-y-8">
        <Link
          ref={(el) => (itemsRef.current[0] = el)}
          to="/"
          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 hover:text-white hover:font-bold rounded"
        >
          <span className="text-gray-200 text-2xl hover:text-white hover:font-bold">
            <IoHome />
          </span>
          {isOpen && <span className="text-xl">Dashboard</span>}
        </Link>

        <Link
          ref={(el) => (itemsRef.current[1] = el)}
          to="/projects"
          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded"
        >
          <span className="text-2xl text-gray-200 hover:text-white hover:font-bold">
            <IoFolderOpenOutline />
          </span>
          {isOpen && (
            <span className="text-xl hover:text-white hover:font-bold ">
              Projects
            </span>
          )}
        </Link>

        <Link
          ref={(el) => (itemsRef.current[2] = el)}
          to="/task-board"
          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded"
        >
          <span className="text-gray-200 text-2xl">
            <FiClipboard />
          </span>
          {isOpen && (
            <span className="text-xl hover:text-white hover:font-bold">
              Task Board
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
