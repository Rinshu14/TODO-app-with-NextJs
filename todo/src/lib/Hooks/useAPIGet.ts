import { useState } from "react"
import axios from "../../lib/axios";
import { toast } from "sonner"
import { APIResponses } from "../Constants/BackendConstants";

interface useAPIGetOptions<T = any> {
    onSuccess?: (data: T) => void;
    onError?: (data: T) => void;
}

const useAPIGet = <T = any>(url: string, options: useAPIGetOptions<T>) => {

    const [loading, setLoading] = useState(false)

    const trigger = async () => {
        try {
            setLoading(true)
            let res = await axios.get(url, { withCredentials: true });
            let responseData = res.data;
            if (responseData.status == APIResponses.success) {
                
                toast.success(responseData.message)
                options?.onSuccess?.(responseData.data)

            }
            else if (responseData.status == APIResponses.failed) {
                toast.error(responseData.message || "Something went wrong")
                options?.onError?.(responseData.data)
            }
        }
        catch (ex: any) {
            console.log(ex)
            toast.error(ex?.response?.data?.message || "Something went wrong")
            options?.onError?.(ex?.response?.data || ex)
        }
        finally {
            setLoading(false)
        }
    }
    return { trigger, loading }
}

export default useAPIGet