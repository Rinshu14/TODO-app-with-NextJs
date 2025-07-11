import React from 'react'
import SearchBar from "./SearchBar"
import TaskItem from './TaskItem';

const Home = () => {
  return (
    <div className='m-auto w-lg'>
      <SearchBar />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {`Today, July 9th`}
      </h3>
      <p className="text-muted-foreground text-sm">Enter your email address</p>
      <TaskItem />


    </div>
  )
}

export default Home
