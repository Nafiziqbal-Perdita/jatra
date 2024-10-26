'use client';
import React from 'react';
import Image from 'next/image';
import { Noto_Serif } from 'next/font/google';

const noto = Noto_Serif({
  weight: '900', 
  
  subsets: ['latin']
});

export default function Header() {
  return (
    <div className='mt-2 rounded-md text-cyan-800 w-10/12 flex items-center justify-center gap-8'>
      <Image src="/bus.svg" alt="Example SVG" width={70} height={70} unoptimized />
      <span className={`${noto.className} sm:text-heading-4 text-heading-6 `}>JATRA</span> {/* Apply the font here */}
    </div>
  );
}
