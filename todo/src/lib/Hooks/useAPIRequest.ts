import { useState } from "react"
import axios from "../axios";
import { toast } from "sonner"
import { APIResponses } from "../Constants/BackendConstants";

interface useAPIRequestOptions<T = any> {
    onSuccess?: (data: T) => void;
    onError?: (data: T) => void;
}

const useAPIRequest = <T = any>(url: string, method: string, options: useAPIRequestOptions<T>,urlParams: string | undefined=undefined) => {

    const [loading, setLoading] = useState(false)
    const requestUrl = (urlParams) ? `${url}/${urlParams}` : url
    const trigger = async (data={}) => {
        try {
            setLoading(true)
            let res = await axios({ method: method, url: requestUrl, data, withCredentials: true })
            //await axios.Request(url, data, { withCredentials: true });
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

export default useAPIRequest