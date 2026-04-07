import { DndContext, closestCorners } from "@dnd-kit/core";
import { useSelector, useDispatch } from "react-redux";
import { moveTask, addTask } from "../features/tasksSlice";
import { useState } from "react";
import Column from "../components/Column";
import { RxCross1 } from "react-icons/rx";
export default function TaskBoard() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [status, setStatus] = useState("todo");
  const [description, setDescription] = useState("");
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || !status) return;

    dispatch(addTask({ title, assignTo, description, status }));

    setTitle("");
    setAssignTo("");
    setStatus("");
    setDescription("");
    setShow(false);
  };
  const getTasks = (status) => tasks.filter((t) => t.status === status);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // console.log("ACTIVE:", active);
    // console.log("OVER:", over);

    if (!over) return;

    dispatch(
      moveTask({
        id: active.id,
        status: over.id,
      }),
    );
  };

  return (
    <div className="relative">
      <div>
        <button
          onClick={() => setShow(true)}
          className="absolute top-3 right-5 border-2 py-2 px-5 text-white bg-indigo-600 border-indigo-600 hover:border-indigo-400 hover:bg-indigo-400 duration-200 rounded-xl hover:cursor-pointer"
        >
          Add New Task
        </button>

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
                    <label className="text-medium text-gray-200">
                      Project Title
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 w-full rounded-md bg-gray-600 px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-medium text-gray-200">
                      Assign To
                    </label>
                    <input
                      value={assignTo}
                      onChange={(e) => setAssignTo(e.target.value)}
                      className="mt-1 w-full rounded-md bg-gray-600 px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-medium text-gray-100">Status</h3>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="bg-gray-600 py-1.5 rounded-md text-white"
                    >
                      <option value="todo">Todo</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-medium text-gray-200">
                      Description
                    </label>
                    <input
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 w-full rounded-md bg-gray-600 px-3 py-1.5 text-white"
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
        </div>
      </div>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="min-h-screen flex flex-wrap justify-center md:items-start bg-gray-100 p-5 text-gray-500 font-medium">
          <div className="flex gap-6">
            <Column id="todo" title="Todo" tasks={getTasks("todo")} />
            <Column
              id="in-progress"
              title="In Progress"
              tasks={getTasks("in-progress")}
            />
            <Column id="done" title="Done" tasks={getTasks("done")} />
          </div>
        </div>
      </DndContext>
    </div>
  );
}
