'use client';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button,buttonVariants, Empty, EmptyDescription, EmptyImage, EmptyTitle } from 'keep-react'

export default function 
() {
  return (
    <div>
        <Empty>
      <EmptyImage className='animate-bounce' >
        <Image
          src="https://staticmania.cdn.prismic.io/staticmania/499b23f3-41ed-4bc9-a9eb-43d13779d2f8_Property+1%3DSad+screen_+Property+2%3DSm.svg"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5">Please hold on for a moment...</EmptyTitle>


    </Empty>
    </div>
  )
}
