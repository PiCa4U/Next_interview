


import {useCallback, useEffect, useState} from "react";
import {IId} from "@/packages/cinema/models/services";

export const useLocalStorage = (id:string) => {
    const [value, setValue] = useState(localStorage.getItem(id));

    const eventListenerFun = useCallback(()=>{
        console.log(localStorage.getItem(id));
        setValue(localStorage.getItem(id));
    },[])

    useEffect(()=>{
        if(!window){
            console.log("useLocalStorage returned");
        }
        window.addEventListener("storage", eventListenerFun);
        return () => window.removeEventListener("storage", eventListenerFun);

    },[])

    return(
    value
    )
}
