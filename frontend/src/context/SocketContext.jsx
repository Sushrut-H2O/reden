import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect (() => {
        if (authUser) {
            const socket = io("http://localhost:8080");
            setSocket(socket);
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    },[]) 

    return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
}