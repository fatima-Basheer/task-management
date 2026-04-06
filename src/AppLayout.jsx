import { useState } from "react";
import Navbar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Stair from "./Stair";
export default function AppLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 bg-gray-100 overflow-auto">
        <Stair />
        <Outlet />
      </div>
    </div>
  );
}
