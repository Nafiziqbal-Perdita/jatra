import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer() {
  const hRef = useRef();

  useEffect(() => {
    if (hRef.current) {
      // GSAP animation for sliding in from the left
      gsap.fromTo(
        hRef.current,
        { x: "-100%", opacity: 0 }, // Start position: off the screen to the left
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" } // End position: original position
      );
    }
  }, []);

  return (
    <header className="bg-white px-2 py-2 mt-1 font-serif  flex items-center justify-center flex-col ">
      <p className="text-sm whitespace-nowrap">
        <span className="hidden sm:inline">
          The server might take longer to respond because it's on free hosting.
        </span>
        For faster performance
        <span className="sm:hidden"> check</span>
        <span className="hidden sm:inline">
          , try running it on your own computer 
        </span>
        <span> from GitHub.</span>
      </p>

      <a
        ref={hRef}
        href="https://github.com/Nafiziqbal-Perdita/bus.git"
        className="text-xs bg-cyan-600 text-white px-5 py-2 rounded-lg"
      >
        https://github.com/Nafiziqbal-Perdita/bus.git
      </a>
      <p className="text-xs text-gray-500 mt-2">
        © 2024 <strong>Nafiz Iqbal</strong>. Licensed under the MIT License.
      </p>
    </header>
  );
}
