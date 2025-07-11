'use client'
import { useUserStore } from '@/app/store/user--'
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from 'react'



interface ProtectedClientProps {
    children: ReactNode; // Use ReactNode for better type safety
}

const ProtectedClient = ({ children }: ProtectedClientProps) => {
    const router = useRouter()
    const isLoggedIn = useUserStore((state) => state.user?.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login")
        }

    }, [isLoggedIn, router])
    if (isLoggedIn)
        return (
            <>
                {children}
            </>
        )
}

export default ProtectedClient
