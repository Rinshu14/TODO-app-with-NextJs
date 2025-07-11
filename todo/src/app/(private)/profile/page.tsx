'use client'
import { Avatar, AvatarImage } from '../../../components/ui/avatar'
import { Mail, Phone } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { ChartNoAxesColumn } from 'lucide-react';
import { Button } from '@/components';
// import { useUserStore } from '@/app/store/user--';
import useCentralStore from '@/app/store/CentralStore';

const Profile = () => {
    //   const bears = useBoundStore((state) => state.bears)
    //const userData = useUserStore((state) => state.user)
    const userData = useCentralStore((state) => state.user)

    return (
        <div className=' bg-modal-background w-96 p-2 py-3 m-auto mt-10 profile '>
            <div className='userInfo flex justify-center items-center '>

                <Avatar className="w-24 h-24 rounded-lg">
                    <AvatarImage src="data:image/jpeg;base64,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"
                        className='rounded-[50%]'
                    />
                </Avatar>
                <div className='mx-5 '>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Rinshu
                    </h4>
                    <div className=''>
                        <span className='flex'> <Mail /><p className='break-all mx-2'>rajputrinshu@gmail.com</p></span>
                        <span className='flex'> <Phone /><p className='break-all mx-2'>1234567890</p></span>
                    </div>
                </div>
            </div>
            <Separator className='my-2' />
            <div className='flex justify-around'>
                <Button className='cursor-pointer'>Edit Profile</Button>
                <Button className='cursor-pointer'>Change Password</Button>
            </div>
            <Separator className='my-2' />
            <div className='px-6'>
                <span className='flex'><ChartNoAxesColumn /><p className='text-xl mx-1.5'> Task Stat</p></span>
                <div className='rounded-lg bg-sidebar-accent p-2 mt-3'>
                    <span className='flex justify-between'>
                        <p className='break-all mx-2'>Total Task</p>
                        <p className='break-all mx-2 '>30</p>
                    </span>
                </div>
                <div className='rounded-lg bg-sidebar-accent p-2 mt-3'>
                    <span className='flex justify-between'>
                        <p className='break-all mx-2'>Completed Tasks</p>
                        <p className='break-all mx-2 text-green-700'>30</p>
                    </span>
                </div>
                <div className='rounded-lg bg-sidebar-accent p-2 mt-3'>
                    <span className='flex justify-between'>
                        <p className='break-all mx-2'>Pending Tasks</p>
                        <p className='break-all mx-2 text-red-800'>30</p>
                    </span>
                </div>
                <div className='rounded-lg bg-sidebar-accent p-2 mt-3'>
                    <span className='flex justify-between'>
                        <p className='break-all mx-2'>Categories</p>
                        <p className='break-all mx-2 text-red-800'>30</p>
                    </span>
                </div>
            </div>

            <Separator className='my-2' />
            <Button variant="destructive" className='w-[100%] cursor-pointer'> Logout</Button>



        </div>


    )
}

export default Profile