"use client"
import { Button, Input } from 'keep-react'
import React from 'react'

export default function Card() {
  return (
    <>
    
    <div className="bg-white h-60 sm:h-44 font-serif w-8/12  flex sm:flex-row flex-col rounded-lg px-2 py-2 ">
      <div className=" basis-4/6 relative  ">
        <div className=" absolute top-2 left-1 flex flex-col">
          <span className="sm:text-lg font-serif font-bold text-cyan-800">
            name: NATIONAL TRAVELS{" "}
          </span>
          <span className="text-sm text-cyan-500 "> type: Non Ac </span>
        </div>
        

        <div className="absolute top-20 left-1 flex flex-col">
          <span> Starting Point: Dhaka</span>
          <span> Time: Dhaka</span>
          <span> Seats Available</span>
        </div>

      </div>
      <div className=" basis-2/6 bg-cyan-800 text-white font-mono flex flex-col items-center justify-center">
      
      <span className="text-xl" >Taka: 500</span>
      <span className="text-lg" >Operator Name</span>
      
      </div>
    </div>


    </>
    

  )
}
