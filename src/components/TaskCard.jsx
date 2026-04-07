import { useDraggable } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";

export default function TaskCard({ task }) {
  const navigate = useNavigate();

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
      {...listeners}
      {...attributes}
      className="border border-gray-400 p-3 mb-2 rounded shadow hover:bg-gray-900 hover:text-white"
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div onClick={handleClick} className="cursor-pointer">
        {task.title}
      </div>
    </div>
  );
}

// import { useDraggable } from "@dnd-kit/core";
// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";

// export default function TaskCard({ task }) {
//   const navigate = useNavigate();

//   const startPos = useRef({ x: 0, y: 0 });
//   const hasDragged = useRef(false);

//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id: task.id,
//   });

//   const handlePointerDown = (e) => {
//     startPos.current = { x: e.clientX, y: e.clientY };
//     hasDragged.current = false;
//   };

//   const handlePointerMove = (e) => {
//     const dx = Math.abs(e.clientX - startPos.current.x);
//     const dy = Math.abs(e.clientY - startPos.current.y);

//     if (dx > 5 || dy > 5) {
//       hasDragged.current = true; 
//     }
//   };

//   const handleClick = () => {
//     if (hasDragged.current) return;
//     navigate(`/task-board/${task.id}`);
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       onPointerDown={handlePointerDown}
//       onPointerMove={handlePointerMove}
//       className="border-1 border-gray-400 p-3 mb-2 rounded shadow hover:bg-gray-900 hover:text-white"
//       style={{
//         transform: transform
//           ? `translate(${transform.x}px, ${transform.y}px)`
//           : undefined,
//       }}
//     >
//       <div
//         onClick={handleClick}
//         className="cursor-pointer"
//       >
//         {task.title}
//       </div>
//     </div>
//   );
// }

