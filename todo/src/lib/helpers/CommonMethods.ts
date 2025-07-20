

import { formatInTimeZone } from 'date-fns-tz'
import { format} from 'date-fns';
import { IDueDate } from "@/Types/CommonInterfaces";

export const formatDates = (dueDate: IDueDate) => {
        let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const dateObj = new Date(dueDate.date)
    let month = formatInTimeZone(dateObj, timeZone, 'MMM')
    let date = formatInTimeZone(dateObj,timeZone, 'dd')
    let day = format(dateObj, 'E')
    let str = `${day}, ${month} ${date}`
    return str
}
export const formatTime = (time:string) => {
     let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const dateObj = new Date(time)
    let month = formatInTimeZone(dateObj, timeZone, 'MMM')
    let date = formatInTimeZone(dateObj,timeZone, 'dd')
    let day = format(dateObj, 'E')
    let str = ` ${day}, ${month} ${date}`
    return str
}