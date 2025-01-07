import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';
import { Message } from '../../zustand/useConversation';

interface MessageSingleProps {
    message: Message;
}

const MessageSingle: React.FC<MessageSingleProps> = ({ message }) => {
    const { authUser } = useAuthContext();
    const { upvoteMessage, downvoteMessage } = useConversation();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser?._id;
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleColorAndText = fromMe ? 'bg-reden-blue text-gray-200' : 'bg-reden-teal text-gray-800';
    const formattedTime = extractTime(message.createdAt);

    const hasUpvoted = authUser ? message.upvotedBy.includes(authUser._id) : false;
    const hasDownvoted = authUser ? message.downvotedBy.includes(authUser._id) : false;

    return (
        <>
        <div className={`chat pt-4 ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img 
                        src={profilePic}
                        alt='Chat image'
                    />
                </div>
            </div>
            <div className={`chat-bubble ${bubbleColorAndText}`}>
                {message.message}
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
                <div>
                    <button onClick={() => upvoteMessage(message._id)} className='pt-1'>
                        {hasUpvoted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4 fill-reden-teal">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        )}
                    </button>
                </div>
                <div>
                    {message.upvoteCount.toString()}
                </div>
                <div className='pl-1'>
                    <button onClick={() => downvoteMessage(message._id)} className='pt-1 rounded-full'>
                    {hasDownvoted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4 fill-reden-blue">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                            </svg>
                          
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        )}
                    </button>
                </div>
                <div>
                {message.downvoteCount.toString()}
                </div>
                <div className='pl-2'>
                    {formattedTime}
                </div>
            </div>
        </div>
    </>
    );
};

export default MessageSingle;

// import React from 'react';
// import { useAuthContext } from '../../context/AuthContext';
// import useConversation from '../../zustand/useConversation';
// import avatarImg from './assets/oreo.png';
// import { Message } from '../../zustand/useConversation';
// import { extractTime } from '../../utils/extractTime.ts';

// interface MessageSingleProps {
//     message: Message;
// }

// const MessageSingle: React.FC<MessageSingleProps> = ({ message }) => {
//     const { authUser } = useAuthContext();
//     const { upvoteMessage, downvoteMessage } = useConversation();
//     const fromMe = message.senderId === authUser?._id;

//     return (
//         <>
//             <div className={`chat ${fromMe ? 'chat-end' : 'chat-start'} pt-4`}>
//                 <div className="chat-image avatar">
//                     <div className="w-10 rounded-full">
//                         <img src={avatarImg} alt='Chat image' />
//                     </div>
//                 </div>
//                 <div className={`chat-bubble text-gray-200 ${fromMe ? 'bg-reden-blue' : 'bg-gray-700'}`}>
//                     {message.message}
//                 </div>
//                 <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
//                     <div className='pl-1'>
//                         <button onClick={() => upvoteMessage(message._id)}>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
//                             </svg>
//                         </button>
//                     </div>
//                     <div>{message.upvoteCount}</div>
//                     <div className='pl-1'>
//                         <button onClick={() => downvoteMessage(message._id)}>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </button>
//                     </div>
//                     <div>{message.downvoteCount}</div>
//                     <div className='pl-2'>
//                         {extractTime(message.createdAt)}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default MessageSingle;
