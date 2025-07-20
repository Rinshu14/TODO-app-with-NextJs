'use client'
import { useState, Fragment } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "./index"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, CalendarClock } from 'lucide-react';
import useAPIRequest from "@/lib/Hooks/useAPIRequest"
import { httpMethods, taskUrls } from '@/lib/Constants/BackendURLS';
import useCentralStore from "@/app/store/CentralStore"
import { formatInTimeZone } from 'date-fns-tz'
import { format, addDays } from 'date-fns';
import { dueDatedays } from "@/Types/enums"
import { IDueDate } from "../Types/CommonInterfaces"
import { formatDates } from "@/lib/helpers/CommonMethods"

// interface DueDate {
//     date: Date
//     timeZone: string
// }

interface DueDateProps {
    id: string
    dueDate: IDueDate | undefined
}

// const formatDates = (dueDate: DueDate) => {
//     const dateObj = new Date(dueDate.date)
//     let month = formatInTimeZone(dateObj, dueDate.timeZone, 'MMM')
//     let date = formatInTimeZone(dateObj, dueDate.timeZone, 'dd')
//     let day = format(dateObj, 'E')
//     let str = `Due ${day}, ${month} ${date}`
//     return str
// }

const DueDate = ({ id, dueDate }: DueDateProps) => {

    const [selectedDate, setSelectedDate] = useState<Date>(dueDate?.date || new Date())
    const updateTask = useCentralStore((state) => state.updateTask)
    const updateSelectedTask = useCentralStore((state) => state.updateSelectedTask)
    const [isPopOveropen, setIsPopOveropen] = useState(false)
    const [isCalenderPopOveropen, setIsCalenderPopOveropen] = useState(false)


    let showDate = (dueDate?.date) ? `Due ${formatDates(dueDate)}` : "Add a due date"
    const { trigger: updateDueDate, loading } = useAPIRequest(taskUrls.updateTask, httpMethods.patch, {
        onSuccess: (data) => {
            updateTask(data)
            updateSelectedTask(data)
        }
    }, id)

    const updateDateInDatabase = (date: Date) => {
        let UTCDate = (new Date(date)).toUTCString()
        let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        let dueDate = { dueDate: { date: UTCDate, timezone: timeZone } }
        updateDueDate(dueDate)
    }

    const saveClick = () => {
        updateDateInDatabase(selectedDate)
        setIsCalenderPopOveropen(false)
        setIsPopOveropen(false)
    }

    const dayClick = (day: dueDatedays) => {
        switch (day) {
            case dueDatedays.today:
                updateDateInDatabase(new Date())
                break;

            case dueDatedays.tomorrow:
                let today = new Date();
                today.setDate((new Date()).getDate() + 1);
                updateDateInDatabase(today)
                break;

            case dueDatedays.nextWeek:
                {

                    const today = new Date();
                    const nextWeekDate = addDays(today, 7)
                    updateDateInDatabase(nextWeekDate)
                }
                break;

            default:
                const temp: never = day
                console.error("a day value is not handled=" + temp)
        }
        setIsPopOveropen(false)
    }


    return (
        <div className=' '>
            <Popover open={isPopOveropen}>
                <PopoverTrigger asChild >
                    <Button variant="ghost" className=' flex justify-center' onClick={() => { setIsPopOveropen(true) }}><CalendarDays />
                        <span className='ml-2'>{showDate}</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className=' w-36 flex flex-col justify-evenly'>
                    {
                        Object.values(dueDatedays).map((item, index) => {
                            return <Fragment key={index} >
                                <Button variant="ghost" className=' font-semibold' onClick={() => { dayClick(item) }}> {item}</Button>
                                <Separator />
                            </Fragment>
                        })
                    }
                    <Popover open={isCalenderPopOveropen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className='font-semibold ' onClick={() => { 
                                
                                setIsCalenderPopOveropen(true) }}> <CalendarClock />Pick a date  </Button>
                        </PopoverTrigger>
                        <PopoverContent side="bottom" className="w-auto  h-[19rem] overflow-x-hidden overflow-y-auto custom-scroll m-0 py-0">

                            <Calendar mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                showOutsideDays={false}
                                required={true}
                                footer={<Button className="savefooter h-6 w-full" onClick={saveClick}>Save</Button>}
                            />


                        </PopoverContent>
                    </Popover>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DueDate