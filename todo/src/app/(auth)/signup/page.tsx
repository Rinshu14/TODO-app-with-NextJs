'use client'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { user } from "../../../lib/Validations/user"
import { userschema } from '../../../lib/Validations/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Button } from "../../../components"
import { Eye, EyeOff } from "lucide-react";
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import useAPIPost from '@/lib/Hooks/useAPIPost'
import { authUrls } from "../../../lib/Constants/BackendURLS"

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const { trigger: signUp, loading } = useAPIPost(authUrls.signup, { onSuccess: () => { router.push('/login') } })

    const { register, formState: { errors }, handleSubmit } = useForm<user>({ mode: "onChange", resolver: zodResolver(userschema) })

    const submitClick = async (data: user) => {
        try {
            signUp(data)
        }
        catch (ex) {
            toast.error("Something went wrong")
        }
    }

    const handlePasswordShowClick = () => {
        setShowPassword((prev) => !prev)
    }

    const redirectToLogin = () => {
        router.replace("/login")
    }

    return (
        <div className="h-[100dvh] flex  justify-center items-center ">
            <main className='border-2 p-5  px-3 flex-col justify-center items-center w-auto rounded-2xl bg-modal-background'>
                <h2 className='font-semibold '>SignUp Form</h2>
                <form onSubmit={handleSubmit(submitClick)} autoComplete='off' className="flex flex-col justify-center items-center px-2 ">
                    <div>
                        <Input {...register('name')} className='my-2  w-[18rem]' autoComplete='off' type="text" placeholder='Enter First Name'></Input>
                        {errors?.name?.message && <p className='text-destructive'>{errors.name?.message}</p>}
                    </div>

                    <div>
                        <Input {...register('phoneNumber')} className='my-2  w-[18rem]' autoComplete='off' type="text" placeholder='Enter Mobile Number'></Input>
                        {errors?.phoneNumber?.message && <p className='text-destructive'>{errors.phoneNumber?.message}</p>}
                    </div>

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

                    <Button type='submit' className=' m-1 p-2' >{loading ? "Processing" : "SignUp"}</Button>

                </form>
                <p className="text-sm justify-self-center m-0 p-0">Already having account?<Button variant="link" className='m-0 px-1' onClick={redirectToLogin}>click here to login</Button></p>
            </main>
        </div>
    )
}
export default SignUp




