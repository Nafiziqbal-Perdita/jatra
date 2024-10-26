'use client';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants, Empty, EmptyDescription, EmptyImage, EmptyTitle } from 'keep-react'

export default function 
({text}) {
  return (
    <div>
        
        <Empty>
      <EmptyImage>
        <Image
        
          src="https://staticmania.cdn.prismic.io/staticmania/a8befbc0-90ae-4835-bf37-8cd1096f450f_Property+1%3DSearch_+Property+2%3DSm.svg"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5">{text}</EmptyTitle>
  
  
    </Empty>


    </div>
  )
}
