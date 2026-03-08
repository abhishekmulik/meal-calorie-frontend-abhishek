import { authStore } from "@/stores/authStore";
import { ApiError } from "@/types";
import { toast } from "sonner";
import RateLimitToast from "../components/common/rate-limit-toast"

export function handleAPIError(error: ApiError): {type: string, message: string} | null{
    switch(error.status_code){
        case 500:
            toast.error("Sorry! It's not you, it's us. Try again later")
            return null
        case 400:
            return {
                type: "validation",
                message: error.message
            }
        case 401:
        case 403:
            authStore.getState().logout()
            return null
        case 404:
            toast.error("Dish not found, suggest trying a different name")
            return null
        case 409:
            return {
                type: "Conflict",
                message: error.message
            }
        case 422:
            toast.error("Alert: food found but lacks nutrition data in USDA")
            return null
        case 429:{
            const rate_limit = "rate_limit"
            toast.info(<RateLimitToast retryAfter={error?.retryAfter ?? 0} toastId={rate_limit}/>,
                {
                  id: rate_limit,
                  duration:Infinity
                })
            return null
        }
           
        default:
            toast.error("Something went wrong")
            return null
    }
}
