'use client'
import TaskItem from "./TaskItem"
import useCentralStore from "../app/store/CentralStore"

const TaskList = () => {
    const taskList=useCentralStore((state)=>state.task)
 
  return (
    <div className="h-[24rem] overflow-y-auto overflow-x- custom-scroll">{
        taskList?.map((item)=>{
            // console.log(item)
            return <TaskItem key={item.id} data={item}/>})
        }</div>
  )
}

export default TaskList