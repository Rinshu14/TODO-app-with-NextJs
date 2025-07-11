'use client'
import React, { use } from 'react'
import { Circle } from 'lucide-react';
import { Button } from './ui/button';
import useCentralStore from '@/app/store/CentralStore';

const TaskItem = () => {
  const task=useCentralStore((state)=>state.task)
  console.log(task)
    return (
        <div className='rounded-lg bg-sidebar-accent p-2 mt-3 w-lg'>
        <span className='flex items-center'>
          <Button type="button" variant="ghost" className="hover:bg-transparent! text-blue-600 text-2xl m-0 p-0"  > <Circle /> </Button>
          <span>
            <p className='break-all mx-2 my-0 p-0'>Pending Tasks</p>
            <p className="text-muted-foreground text-sm mx-2 my-0 py-0 ">Enter your email address.</p>
          </span>
        </span>
       
      </div> 
    )
}

export default TaskItem