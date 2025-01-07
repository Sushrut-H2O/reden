//import avatarImg from './assets/oreo.png'

import useConversation from "../../zustand/useConversation";

interface ConversationProps {
    conversation: {
        _id: string;
        fullName: string;
        profilePic: string;
        username: string;
    },
    lastIdx: boolean;
}

const Conversation = ({conversation, lastIdx}: ConversationProps) => {
    const {selectedConversation, setSelectedConversation} = useConversation()
    const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
        <div 
            className={`flex gap-2 items-center hover:bg-gradient-to-r hover:from-reden-teal hover:to-reden-blue hover:text-gray-800 rounded p-2 cursor-pointer ${isSelected ? "bg-gradient-to-r from-reden-teal to-reden-blue text-gray-800" : ""}`}
            onClick={() => setSelectedConversation(conversation)}
        >
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img
                        src={conversation.profilePic}
                        alt="user avatar"
                    />
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <div className='flex flex-col justify-items-start text-left'>
                    <p className='font-semibold'>{conversation.fullName}</p>
                    <p className='text-xs'>@{conversation.username}</p>
                </div>
            </div>
        </div>
        {!lastIdx && <div className='divider my-0 py-0 h-1' />}
    </>
  )
}

export default Conversation