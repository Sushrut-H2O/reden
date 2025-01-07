import Messages from './messages'
import MessageInput from './messageinput'
import NCS from './ncs'
import useConversation from '../../zustand/useConversation'
import { useEffect } from 'react'

const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation} = useConversation()

    useEffect(() => {
        return () => setSelectedConversation(null);
    },[setSelectedConversation])

    if (!selectedConversation) {
        return (
            <div className='flex flex-1'>
                <NCS />
            </div>
        );
    } else {
        return (
            <div className='flex flex-col flex-1'>
                <div className="flex gap-2 items-center bg-gradient-to-r from-reden-teal to-reden-blue text-gray-800 rounded-r-2xl p-2">
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img
                                src={selectedConversation.profilePic}
                                alt="user avatar"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col flex-1'>
                        <div className='flex flex-col justify-items-start text-left'>
                            <p className='font-semibold'>{selectedConversation.fullName}</p>
                            <p className='text-xs'>@{selectedConversation.username}</p>
                        </div>
                    </div>
                </div>
                <Messages />
                <MessageInput />
            </div>
        )
    }
}

export default MessageContainer