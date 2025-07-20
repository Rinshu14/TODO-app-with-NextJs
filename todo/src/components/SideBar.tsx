'use client'
import {  Paperclip } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { Input } from '../components';
import CategoryOptions from './CategoryOptions';
import DueDate from './DueDate';
import useCentralStore from '@/app/store/CentralStore';
import AddNote from './AddNote';
import SideBarFooter from './SideBarFooter';


const SideBar = () => {

  const selectedTask = useCentralStore((state) => state.selectedTask)


  if (selectedTask == null) return <></>
  return (
    <div className='bg-muted  h-full absolute right-0.5 w-[30rem] md:static md:w-full'>

      <header className='h-[10%] flex justify-center items-center'>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {selectedTask.title}
        </h3>
      </header>
      <Separator />
      <main className='sidebar-content h-[80%] flex flex-col justify-evenly items-center'>
        <DueDate id={selectedTask.id} dueDate={selectedTask.dueDate} />
        <Separator />
        <CategoryOptions selectedCategory={selectedTask.category} id={selectedTask.id} />
        <Separator />
        <div >
          <Input type="file" className='hidden' id="upload" />
          <label htmlFor="upload" className='flex items-center '>  <Paperclip /><p className='ml-1'>Add File</p></label>
        </div>
        <Separator />

        <AddNote id={selectedTask.id} description={selectedTask?.description} />
      </main>

      <Separator />
    
      <SideBarFooter />
    </div>
  )
}

export default SideBar


