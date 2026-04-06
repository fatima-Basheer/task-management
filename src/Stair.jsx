import React from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
function Stair() {
  const currentPath=useLocation().pathname;
  const stairParentRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(stairParentRef.current, {
      display: "block",
    });

    tl.from(".stair", {
      height: 0,
      stagger: {
        amount: -0.25,
      },
    });
    tl.to(".stair", {
      y: "100%",
      stagger: {
        amount: -0.25,
      },
    });
    tl.to(stairParentRef.current, {
      display: "none",
    });
    tl.to(".stair", {
      y: "0%",
    });
  },[currentPath]);
  return (
    <div ref={stairParentRef} className="h-screen w-full fixed z-20 top-0">
      <div className="h-full w-full flex">
        <div className="stair h-full w-1/5 bg-gray-800"></div>
        <div className="stair h-full w-1/5 bg-gray-800"></div>
        <div className="stair h-full w-1/5 bg-gray-800"></div>
        <div className="stair h-full w-1/5 bg-gray-800"></div>
        <div className="stair h-full w-1/5 bg-gray-800"></div>
      </div>
    </div>
  );
}

export default Stair;