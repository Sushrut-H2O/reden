import { useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    const sendMessage = async (message: string) => {
        setLoading(true);

        try {
            console.log(selectedConversation?._id)
            const res = await fetch(`/api/messages/send/${selectedConversation?._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({message})
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.removeItem("chat-user");
            setMessages([...messages, data]);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
};

export default useSendMessage;
