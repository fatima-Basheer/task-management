import { useDraggable } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";

export default function TaskCard({ task }) {
  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="border-1 border-gray-400 p-3 mb-2 rounded shadow hover:bg-gray-900 hover:text-white"
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      <div
        onClick={() => navigate(`/task-board/${task.id}`)}
        className="cursor-pointer"
      >
        {task.title}
      </div>
    </div>
  );
}
