import { DndContext, closestCorners } from "@dnd-kit/core";
import { useSelector, useDispatch } from "react-redux";
import { moveTask } from "../features/tasksSlice";
import Column from "../components/Column";

export default function TaskBoard() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const getTasks = (status) =>
    tasks.filter((t) => t.status === status);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log("ACTIVE:", active);
    console.log("OVER:", over);

    if (!over) return;

    dispatch(
      moveTask({
        id: active.id,
        status: over.id,
      })
    );
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen flex justify-center items-start bg-gray-100 p-6 text-gray-500 font-medium">
        <div className="flex gap-6">
          <Column id="todo" title="Todo" tasks={getTasks("todo")} />
          <Column id="in-progress" title="In Progress" tasks={getTasks("in-progress")} />
          <Column id="done" title="Done" tasks={getTasks("done")} />
        </div>
      </div>
    </DndContext>
  );
}