import React from 'react';
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./conversation.tsx"; // Ensure the correct path to the Conversation component

const Conversations: React.FC = () => {
  const { loading, conversations } = useGetConversations();

  const sortedConversations = [...conversations].sort((a, b) => {
    const usernameA = a.username.toLowerCase();
    const usernameB = b.username.toLowerCase(); // Assuming first participant's username
    return usernameA.localeCompare(usernameB);
  });

  console.log("Sorted Conversations:", sortedConversations);

  return (
    <div className="py-2 flex flex-col overflow-auto max-h-[64vh]">
      {sortedConversations.map((conversation, idx) => (
        <Conversation 
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1} // Correctly referencing conversations.length
        />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  );
}

export default Conversations;