"use client"
import { Button, Input } from 'keep-react'
import React from 'react'

export default function Card({data}) {
  if (!data) {
    return null; // Don't render the component if data is missing
  }
  // console.log(data);
  // console.log(data.name);
  return (
    <>
    
    <div className="bg-white h-64 sm:h-44 font-serif sm:w-8/12 w-11/12 flex sm:flex-row flex-col rounded-lg px-2 py-2 ">
      <div className=" sm:basis-4/6 basis-9/12 flex flex-col gap-2  ">
        <div className="  top-2 left-1 flex flex-col">
          <span className="sm:text-lg font-serif font-bold text-cyan-800">
            {data.name}
          </span>
          <span className="text-sm text-cyan-500 ">{data.type} </span>
        </div>
        

        <div className=" top-20 left-1 flex flex-col">
          <span> Starting Point: {data.starting_point} </span>
          <span> Departure Time: {data.start_time}</span>
          <span className='font-sans' > { data.seats}</span>
        </div>

      </div>
      <div className=" sm:basis-2/6 basis-4/12 bg-cyan-800 text-white font-mono flex flex-col items-center justify-center">
      
      <span className="text-xl" >{data.money}</span>
      <span className="text-xs font-serif " >Source: {data.source} </span>
      
      </div>
    </div>


    </>
    

  )
}
