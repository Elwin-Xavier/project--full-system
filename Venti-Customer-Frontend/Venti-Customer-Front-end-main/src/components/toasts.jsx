import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Success(message) {
    toast.success(message, {
        position: 'top-right',
    });
}
export function Error(message){
    toast.error(message, {
        position:"top-right",
    });
}
export function Warn(message){
    toast.warn(message,{
        position:"top-right",
    })
}
export function Info(message){
    toast.info(message, {
        position:"top-right",
    })
}