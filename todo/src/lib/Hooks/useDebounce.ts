
'use client'
import { useCallback, useEffect, useRef } from 'react'

const useDebounce = (func: (data: any) => Promise<void>, delay: string) => {

    let timerId = useRef<null | NodeJS.Timeout>(null)

    const debouncedFunction = useCallback((data: any) => {

      //  console.log("in debounce function===" + data)
        if (timerId.current) {
            console.log("clearing timer")
            clearTimeout(timerId.current)
            timerId.current = null

        }


        timerId.current = setTimeout(() => {
          //  console.log("finally making call in settimeout callback ==" + data)
            func(data)
        }, parseInt(delay))


    }, [func, delay])

    useEffect(() => {
        return (
            () => {
                if (timerId.current) {
                    clearTimeout(timerId.current)
                    timerId.current = null
                }
            })
    }, [debouncedFunction])





    return debouncedFunction
}

export default useDebounce
