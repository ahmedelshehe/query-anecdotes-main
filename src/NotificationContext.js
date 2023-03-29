import { createContext , useReducer ,useContext } from "react";

const notificationReducer = (state ,action) => {
    switch (action.type) {
        case "NEW":
            return action.payload
        case "RESET":
            return null    
        default:
            break;
    }
}
const NotificationContext = createContext()

export const NotificationContextProvider = (props) =>{
    const [notification ,notificationDispatcher] = useReducer(notificationReducer ,null)
    return <NotificationContext.Provider value={[notification,notificationDispatcher]}>
        {props.children}
    </NotificationContext.Provider>
}
export const useNotificationValue = () => {
    const notificationAndDispatch =useContext(NotificationContext)
    return notificationAndDispatch[0]
}
export const useNotificationDispatch = () => {
    const notificationAndDispatch =useContext(NotificationContext)
    return notificationAndDispatch[1]
}