'use client'
import { useRef } from 'react'
import { Input } from "./ui/input"
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import useAPIPost from '@/lib/Hooks/useAPIPost';
import { taskCategory, taskStatus, taskPriority } from '@/Types/enums';
// import { useUserStore } from '@/app/store/user--';
import useCentralStore from '@/app/store/CentralStore';
import { taskUrls } from "../lib/Constants/BackendURLS"


const SearchBar = () => {

    const inputRef = useRef<null | HTMLInputElement>(null)
    const setTask = useCentralStore((state) => state.setTask)
    const userId = useCentralStore((state) => state.user?.id)
    const { trigger: addTask, loading } = useAPIPost(taskUrls.addTask, {
        onSuccess: (data) => {
            setTask(data)
            console.log("in success")
        }
    })

    const addTaskClick = () => {
        if (inputRef.current?.value) {
            let data = {
                title: inputRef.current.value,
                status: taskStatus.pending,
                userId: userId
            }
            addTask(data)
        }

    }
    
    return (
        <div className='my-4 relative'>
            <Button type="button" variant="ghost" className="absolute top-1.5 hover:bg-transparent! text-blue-600 text-2xl"  > <Plus /> </Button>
            <div className='flex '>
                <Input type="text" placeholder="Add new task" className='w-lg rounded-none rounded-tl-3xl rounded-bl-3xl  px-9 h-12' ref={inputRef} />
                <Button type="button" className='rounded-none rounded-tr-3xl rounded-br-3xl h-12 w-16' onClick={addTaskClick}> Add</Button>
            </div>
        </div>
    )
}

export default SearchBar