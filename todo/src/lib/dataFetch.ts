
import axios from "./axios"
import { profileUrls,taskUrls } from "../lib/Constants/BackendURLS"
import { cookies } from 'next/headers'

export const fetchTaskData = async () => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    let responseData = await axios.get(taskUrls.fetchTask, { headers: { "Cookie": `token=${token}` } })
    
       //console.log(responseData.data.data)
    return responseData.data.data
  }
  catch (ex) {
    if (ex instanceof Error) {
      console.log(ex.message)
    }
  }
}


export const fetchProfileData = async () => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    let responseData = await axios.get(profileUrls.viewProfile, { headers: { "Cookie": `token=${token}` } })

    return responseData.data.data
  }
  catch (ex) {
    if (ex instanceof Error) {
      console.log(ex.message)
    }
  }
}

