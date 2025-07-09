
"use client"
import {useEffect} from 'react'
import { Button, Input, Avatar, AvatarImage } from '../components'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import UserInfo from './UserInfo'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/app/store/user'
import { defaultImageUrl } from '@/lib/Constants/AppConstants'



const Header = ({ userData }) => {


    const router = useRouter()
    const redirectToHome = () => {
        router.push("/")
    }

    const setUser = useUserStore((state) => state.setUser)
    const isLoggedIn = useUserStore((state) => state.user?.isLoggedIn)
    const photoUrl = useUserStore((state) => state.user?.photoUrl) || defaultImageUrl


    useEffect(() => {
        if (userData) {
            setUser({...userData,isLoggedIn:true})
        }
    }, [userData])

    // if (userData) {
    //     setUser({...userData,isLoggedIn:true})
    // }

    return (
        <header className='bg-modal-background h-14  md:px-5'>
            <nav className='h-[100%] flex items-center justify-between'>
                <Button variant="ghost" className='h-[100%] p-0 cursor-pointer' onClick={redirectToHome}>TickTask</Button>

                {isLoggedIn && <>
                    <Input type="text" className='w-lg mx-3' />
                    <Popover>
                        <PopoverTrigger>
                            <Avatar>
                                <AvatarImage src={photoUrl} />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className='w-[20rem]'>
                            <UserInfo />
                        </PopoverContent>
                    </Popover>

                </>
                }
            </nav>
        </header>
    )
}

export default Header
