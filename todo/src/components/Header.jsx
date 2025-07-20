
"use client"
import { useEffect } from 'react'
import { Button, Input, Avatar, AvatarImage } from '../components'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import UserInfo from './UserInfo'
import { useRouter } from 'next/navigation'
import { defaultImageUrl } from '@/lib/Constants/AppConstants'
import { ThemeToggle } from '../components'
import useCentralStore from '@/app/store/CentralStore'

const Header = ({ userData, taskData }) => {

    const router = useRouter()
    const redirectToHome = () => {
        router.push("/")
    }

    const setUser = useCentralStore((state) => state.setUser)
    const setTasks = useCentralStore((state) => state.setTasks)
    const isLoggedIn = useCentralStore((state) => state.user?.isLoggedIn)
    const photoUrl = useCentralStore((state) => state.user?.photoUrl) || defaultImageUrl

    useEffect(() => {
        if (userData) {
            setUser({ ...userData, isLoggedIn: true })
        }
        if (taskData) {
            setTasks(taskData)
        }
    }, [userData,taskData])

   

    return (
        <header className='bg-modal-background h-14 md:px-5 '>
            <nav className='h-[100%] w-full flex items-center justify-between'>
                <Button variant="ghost" className='h-[100%] p-0 cursor-pointer' onClick={redirectToHome}>TickTask</Button>
                {isLoggedIn && <>
                    <Input type="text" className='w-lg mx-3' />
                    <div className='flex items-center '>
                        <ThemeToggle />
                        <Popover className="">
                            <PopoverTrigger>
                                <Avatar className='mx-4'>
                                    <AvatarImage src={photoUrl} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-[20rem]'>
                                <UserInfo />
                            </PopoverContent>
                        </Popover>
                    </div>
                </>
                }
            </nav>
        </header>
    )
}

export default Header
