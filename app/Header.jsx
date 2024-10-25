import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Header() {
  const hRef = useRef();

  useEffect(() => {
    if (hRef.current) {
      // GSAP animation for sliding in from the left
      gsap.fromTo(
        hRef.current,
        { x: '-100%', opacity: 0 }, // Start position: off the screen to the left
        { x: 0, opacity: 1, duration: 1, ease: 'power2.out' } // End position: original position
      );
    }
  }, []);

  return (
    <header  className='bg-white px-2 py-2 mt-1 font-serif  flex items-center justify-center flex-col rounded-md ' >
      <p className='text-sm'>
        The server might take longer to respond because it's on free
        hosting. For faster performance, try running it on your own computer
        from GitHub.
      </p>
      <p ref={hRef} className='text-xs bg-cyan-600 text-white px-5 py-2 rounded-lg' >https://github.com/Nafiziqbal-Perdita/bus.git</p>
    </header>
  );
}
