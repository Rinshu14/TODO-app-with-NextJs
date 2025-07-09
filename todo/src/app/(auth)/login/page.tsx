'use client'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { user, userLogin } from "../../../lib/Validations/user"
import { userLoginSchema } from '../../../lib/Validations/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Button } from "../../../components"
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/navigation'
import useAPIPost from '@/lib/Hooks/useAPIPost'
import { authUrls } from "../../../lib/Constants/BackendURLS"
import { useUserStore } from '@/app/store/user'


interface User {
    name: string
    email: string
    phoneNumber: string
    isLoggedIn: boolean
    photoUrl: string
}

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser)
    const { trigger: login, loading } = useAPIPost(authUrls.login, {
        onSuccess: (data) => {
            console.log(data)
            router.replace("/")
            if (data) {
                setUser({...data,isLoggedIn:true})
            }

        }
    })

    const { register, formState: { errors }, handleSubmit } = useForm<userLogin>({ mode: "onChange", resolver: zodResolver(userLoginSchema) })

    const submitClick = async (data: userLogin) => {
        login(data)



    }

    const handlePasswordShowClick = () => {
        setShowPassword((prev) => !prev)
    }

    const redirectToSignup = () => {
        router.replace("/signup")
    }

    return (
        <div className="h-[100dvh] flex  justify-center items-center ">
            <main className='border-2 p-5  px-3 flex-col justify-center items-center w-auto rounded-2xl bg-modal-background'>
                <h2 className='font-semibold '>SignUp Form</h2>
                <form onSubmit={handleSubmit(submitClick, (error) => { console.log(error) })} autoComplete='off' className="flex flex-col justify-center items-center px-2 ">
                    <div>
                        <Input {...register('email')} className='my-2  w-[18rem]' autoComplete='off' type="email" placeholder=' Enter EmailId'></Input>
                        {errors?.email?.message && <p className='text-destructive text font-[10px]'>{errors.email?.message}</p>}
                    </div>

                    <div>
                        <div className='flex items-center  relative '>
                            <Input {...register('password')} className='my-2  w-[18rem]' autoComplete='off' type={showPassword ? "text" : "password"} placeholder='Enter password' />
                            <Button type="button" variant="ghost" className="absolute right-3 hover:!bg-transparent" onClick={handlePasswordShowClick} >{showPassword ? <EyeOff /> : <Eye />}</Button>
                        </div>
                        {errors?.password?.message && <p className='text-destructive'>{errors.password?.message}</p>}
                    </div>
                    <Button type='submit' className=' m-1 p-2'>Login</Button>
                </form>
                <p className="text-sm justify-self-center">Not having account?<Button variant="link" className='m-0 px-1' onClick={redirectToSignup}>click here to signUp</Button></p>
            </main>
        </div>
    )
}

export default Login