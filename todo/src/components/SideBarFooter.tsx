'use cleint'
import { useShallow } from 'zustand/react/shallow'
import { PanelRightOpen, Paperclip, Trash2 } from 'lucide-react';
import useCentralStore from '@/app/store/CentralStore';
import { AppState } from "../app/store/CentralStore"
import useAPIRequest from '@/lib/Hooks/useAPIRequest';
import { taskUrls, httpMethods } from '@/lib/Constants/BackendURLS';
import { Button } from './ui/button';
import { formatTime } from "../lib/helpers/CommonMethods"

const selectorFunction = (state: AppState) => ({
    id: state.selectedTask?.id, createdAt: state.selectedTask?.createdAt, setSidebar: state.setSidebar, setSelectedTask: state.setSelectedTask,
    deleteTask: state.deleteTask
})


const SideBarFooter = () => {

    const { id, createdAt, setSidebar, setSelectedTask, deleteTask } = useCentralStore(useShallow(selectorFunction))

    const { trigger: deleteTaskRequest, loading } = useAPIRequest(taskUrls.deleteTask, httpMethods.delete, {
        onSuccess: () => {
            setSidebar(false)
            setSelectedTask(null)
            if (id) deleteTask(id)

        }
    },id)
    const createdAtTime = `Created At ${formatTime(createdAt!)}`


    return (
        <footer className='h-[10%]  flex justify-around items-center'>
            <Button variant="ghost" onClick={() => { setSidebar(false) }}>
                <PanelRightOpen />
            </Button>
            <p> {createdAtTime} </p>
            <Button variant="ghost" onClick={() => { deleteTaskRequest() }}>
                <Trash2 className='text-3xl' />
            </Button>

        </footer>
    )
}

export default SideBarFooter
