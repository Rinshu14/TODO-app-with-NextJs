import React from 'react'
import SearchBar from "./SearchBar"
import TaskList from "./TaskList"


const Home = () => {
  return (
    <div className='m-auto w-lg'>
      <SearchBar />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {`Today, July 9th`}
      </h3>
      <p className="text-muted-foreground text-sm mb-2">Enter your email address</p>
      <TaskList/>


    </div>
  )
}

export default Home
