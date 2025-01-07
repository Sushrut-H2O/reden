import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const {loading, sendMessage} = useSendMessage();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("");
  };



  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
        <div className="w-full">
            <div className="join w-full">
                <input 
                  type="text"
                  className="input input-bordered border-gray-200 join-item rounded-l-full w-full" 
                  placeholder="Send a message..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="btn join-item border-gray-200 rounded-r-full hover:bg-gradient-to-r hover:from-reden-teal hover:to-reden-blue hover:border-gray-200 hover:text-gray-800">
                  {
                    loading ? <div className="loading loading-spinner"></div>
                            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                              </svg>
                  }
                </button>
            </div>
        </div>
    </form>
  )
}

export default MessageInput