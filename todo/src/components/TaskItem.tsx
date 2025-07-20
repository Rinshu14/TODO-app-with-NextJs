'use client'
import React, { use } from 'react'
import { Circle } from 'lucide-react';
import { Button } from './ui/button';
import useCentralStore from '@/app/store/CentralStore';

const TaskItem = ({ data }: any) => {

  const setSelectedTask = useCentralStore((state) => state.setSelectedTask)
  const setSidebar = useCentralStore((state) => state.setSidebar)

  const taskClick = () => {
    setSidebar(true)
    setSelectedTask(data)
    console.log("task click")

  }

  const completeButtonClick = (e: any) => {
    e.stopPropagation()
    console.log("in circle button")
  }
  return (
    <div className='rounded-lg bg-sidebar-accent p-2 mt-3 w-full'>
      <span className='flex items-center' onClick={taskClick}>
        <Button type="button" variant="ghost" className="hover:bg-transparent! text-blue-600 text-2xl m-0 p-0" onClick={completeButtonClick} > <Circle /> </Button>
        <span>
          <p className='break-all mx-2 my-0 p-0'>{data.title}</p>
          <p className="text-muted-foreground text-sm mx-2 my-0 py-0 ">{data?.description}</p>
        </span>
      </span>

    </div>
  )
}

export default TaskItem