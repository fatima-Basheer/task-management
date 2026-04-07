import { useDraggable } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTask } from "../features/tasksSlice";
export default function TaskCard({ task }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDel = (id) => {
    dispatch(deleteTask(id));
  };

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const handleClick = () => {
    if (isDragging) return;

    navigate(`/task-board/${task.id}`);
  };

  return (
    <div
      ref={setNodeRef}
      className="border border-gray-400 p-2 mb-2 rounded shadow hover:bg-gray-900 hover:text-white"
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="relative flex justify-between">
        <div
          {...listeners}
          {...attributes}
          className="cursor-move mt-0.5"
          onClick={handleClick}
        >
          {task.title}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDel(task.id);
          }}
          className="relative bg-purple-700 py-1 px-3 text-white rounded-md cursor-pointer hover:bg-purple-500"
        >
          Del.
        </button>
      </div>
    </div>
  );
}
