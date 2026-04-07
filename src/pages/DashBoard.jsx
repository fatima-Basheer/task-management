import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { GiLaptop } from "react-icons/gi";

export default function DashBoard() {
  const containerRef = useRef();

  const stats = [
    { title: "Total Tasks", value: 90, color: "#2E8B57" },
    { title: "Completed Tasks", value: 80, color: "#3B82F6" },
  ];

  const projects = [
    { name: "Project A", value: 75, color: "#22C55E" },
    { name: "Project B", value: 50, color: "#F59E0B" },
    { name: "Project C", value: 25, color: "#EF4444" },
  ];

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      });

      const circles = gsap.utils.toArray(".static-circle");

      circles.forEach((circle) => {
        const parent = circle.closest(".loader");
        const numberEl = parent.querySelector(".count");

        const value = +numberEl.dataset.value;

        const r = 40;
        const c = 2 * Math.PI * r;

        circle.style.strokeDasharray = c;
        circle.style.strokeDashoffset = c;

        let obj = { val: 0 };

        gsap.to(obj, {
          val: value,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            const current = Math.floor(obj.val);
            numberEl.innerText = current + "%";

            const offset = c - (current / 100) * c;
            circle.style.strokeDashoffset = offset;
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="p-4 sm:p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
    >
      {stats.map((item, index) => (
        <div
          key={index}
          className="card bg-white rounded-xl p-4 sm:p-6 shadow-lg flex flex-col items-center"
        >
          <h4 className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
            {item.title}
          </h4>

          <div className="loader relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
            <svg className="w-full h-full rotate-[-90deg]">
              <circle
                cx="50%"
                cy="50%"
                r="40"
                stroke="#eee"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                className="static-circle"
                cx="50%"
                cy="50%"
                r="40"
                stroke={item.color}
                strokeWidth="10"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            <div
              className="count absolute inset-0 flex items-center justify-center font-bold text-lg sm:text-xl"
              data-value={item.value}
            >
              0%
            </div>
          </div>
        </div>
      ))}

      <div className="card md:col-span-2 bg-white rounded-xl p-2 sm:p-6 shadow-lg">
        <h4 className="text-gray-600 text-sm sm:text-base sm:mb-6">
          Active Projects
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col gap-3 sm:gap-4">
            {projects.map((proj, i) => (
              <div
                key={i}
                className="flex justify-between text-sm sm:text-base font-medium"
              >
                <span>{proj.name}</span>
                <span>{proj.value}%</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#eee"
                  strokeWidth="18"
                  fill="transparent"
                />

                {(() => {
                  let cumulative = 0;

                  return projects.map((proj, i) => {
                    const dash = (proj.value / 100) * circumference;
                    const gap = circumference - dash;

                    const el = (
                      <circle
                        key={i}
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke={proj.color}
                        strokeWidth="18"
                        fill="transparent"
                        strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={-cumulative}
                        strokeLinecap="round"
                      />
                    );

                    cumulative += dash;
                    return el;
                  });
                })()}
              </svg>

              <div className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl font-bold">
                <GiLaptop className="text-xl sm:text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
