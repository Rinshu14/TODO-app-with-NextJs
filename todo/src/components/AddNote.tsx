import useAPIRequest from '@/lib/Hooks/useAPIRequest';
import React from 'react'
import { Textarea } from './ui/textarea';
import useCentralStore from '@/app/store/CentralStore';
import { httpMethods, taskUrls } from '@/lib/Constants/BackendURLS';
import useDebounce from '@/lib/Hooks/useDebounce';
import { debounceDelayForDescription } from "../lib/Constants/AppConstants"

interface AddNoteProps {
    id: string
    description: string | undefined
}



const AddNote = ({ id, description }: AddNoteProps) => {


    const updateTask = useCentralStore((state) => state.updateTask)
    const updateSelectedTask = useCentralStore((state) => state.updateSelectedTask)

    const { trigger: updateDescription, loading } = useAPIRequest(taskUrls.updateTask, httpMethods.patch, {
        onSuccess: (data) => {
            updateTask(data)
            updateSelectedTask(data)
        }
    }, id)

    const debouncedFunction = useDebounce(updateDescription, debounceDelayForDescription)


    const noteChange = (e: any) => {
        console.log(e.target.value)

        debouncedFunction({ description: e.target.value })
    }

    return (
        <div>
            <Textarea className='w-96 h-24 custom-scroll' placeholder='Add Note' onChange={noteChange}></Textarea>
        </div>
    )
}

export default AddNote