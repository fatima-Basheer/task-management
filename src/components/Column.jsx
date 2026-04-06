import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
export default function Column({ id, title, tasks }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-white w-72 min-h-[400px] p-4 rounded shadow hover:scale-105"
    >
      <h2 className="font-bold mb-3 text-gray-700 text-2xl text-center">
        {title}
      </h2>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
