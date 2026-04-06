import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
export default function DashBoard() {
  const containerRef = useRef();

  const stats = [
    { title: "Total Tasks", value: 90 },
    { title: "Completed Tasks", value: 80 },
    { title: "Active Projects", value: 65 },
  ];

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");

      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      cards.forEach((card) => {
        const circle = card.querySelector(".circle");
        const numberEl = card.querySelector(".count");

        const value = +numberEl.dataset.value;

        const radius = 45;
        const circumference = 2 * Math.PI * radius;

        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;

        let obj = { val: 0 };

        gsap.to(obj, {
          val: value,
          duration: 1.5,
          ease: "power2.out",

          onUpdate: () => {
            const current = Math.floor(obj.val);

            numberEl.innerText = current + "%";

            const offset = circumference - (current / 100) * circumference;

            circle.style.strokeDashoffset = offset;
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    
  <>

    <div
      ref={containerRef}
      className="
        p-5 
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-5
      "
    >
      {stats.map((item, index) => (
        <div
          key={index}
          className="card bg-slate-800 text-white rounded-xl p-5 shadow-lg flex flex-col items-center"
        >
          <h4 className="text-sm text-gray-300 mb-4">{item.title}</h4>

          <div className="relative w-48 h-28">
            <svg className="w-full h-full rotate-[-90deg]">
              <circle
                cx="50%"
                cy="50%"
                r="45"
                stroke="#334155"
                strokeWidth="15"
                fill="transparent"
              />

              <circle
                className="circle"
                cx="50%"
                cy="50%"
                r="45"
                stroke="pink"
                strokeWidth="15"
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            <div
              className="count absolute inset-0 flex items-center justify-center font-bold text-2xl"
              data-value={item.value}
            >
              0%
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
  );
}
