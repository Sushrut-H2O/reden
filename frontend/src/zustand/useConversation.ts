// import {create} from 'zustand';
// import '../hooks/useGetConversations.ts'

// export interface Message {
//     _id: string;
//     senderId: string;
//     receiverId: string;
//     message: string;
//     upvoteCount: number;
//     downvoteCount: number;
//     createdAt: string;
// }

// export interface Conversation {
//     _id: string;
//     fullName: string;
//     username: string;
//     profilePic: string
// }

// interface ConversationState {
//     selectedConversation: Conversation | null;
//     setSelectedConversation: (selectedConversation: Conversation | null) => void;
//     messages: Message[];
//     setMessages: (messages: Message[]) => void;
// }

// const useConversation = create<ConversationState>((set) => ({
//     selectedConversation: null,
//     setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
//     messages: [],
//     setMessages: (messages) => set({ messages })
// }));

// export default useConversation;

import {create} from 'zustand';
import '../hooks/useGetConversations.ts'
import toast from 'react-hot-toast';

export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    upvoteCount: number;
    downvoteCount: number;
    upvotedBy: string[];
    downvotedBy: string[];
    createdAt: string;
}

export interface Conversation {
    _id: string;
    fullName: string;
    username: string;
    profilePic: string;
}

interface ConversationState {
    selectedConversation: Conversation | null;
    setSelectedConversation: (selectedConversation: Conversation | null) => void;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    upvoteMessage: (id: string) => void;
    downvoteMessage: (id: string) => void;
}

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    upvoteMessage: async (id: string) => {
        try {
            const res = await fetch(`/api/messages/upvote/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            set((state) => ({
                messages: state.messages.map((message) =>
                    message._id === id ? data : message
                ),
            }));
        } catch (error: any) {
            toast.error(error.message);
        }
    },
    downvoteMessage: async (id: string) => {
        try {
            const res = await fetch(`/api/messages/downvote/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            set((state) => ({
                messages: state.messages.map((message) =>
                    message._id === id ? data : message
                ),
            }));
        } catch (error: any) {
            toast.error(error.message);
        }
    },
}));

export default useConversation;