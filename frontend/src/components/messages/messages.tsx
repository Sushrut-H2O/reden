import { useEffect } from "react";
import useGetMessages from "../../hooks/useGetMessages"
import MessageSkeleton from "../skeletons/messageSkeleton";
import MessageSingle from "./message"
import React from "react";

const Messages = () => {
  const {loading, messages} = useGetMessages();
  const lastMessageRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior: "smooth"})
    }, 100)
  },[messages])

  return (
    <div className="px-4 flex-1 overflow-auto max-h-[74vh]">
      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <MessageSingle message={message} />
        </div>
      ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center pt-8">Hmm...looks like you've never talked to this person before.</p>
          <p className="text-center font-semibold">Well, there's no time like the present to start a conversation!</p>
        </div>
      )}

    </div>
  )
}

export default Messages