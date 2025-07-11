import { useState } from "react"
import axios from "../../lib/axios";
import { toast } from "sonner"
import { APIResponses } from "../Constants/BackendConstants";

interface useAPIPostOptions<T = any> {
    onSuccess?: (data: T) => void;
    onError?: (data: T) => void;
}

const useAPIPost = <T = any>(url: string, options: useAPIPostOptions<T>) => {

    const [loading, setLoading] = useState(false)
    const trigger = async (data: any) => {
        try {
            setLoading(true)
            let res = await axios.post(url, data, { withCredentials: true });
            let responseData = res.data;
            if (responseData.status == APIResponses.success) {
              //  setData(responseData.data)
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

export default useAPIPost