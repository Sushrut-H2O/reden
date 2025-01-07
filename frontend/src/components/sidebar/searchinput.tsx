import { useState } from "react"
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversations();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("That's too short, dude. Give us something to work with here!")
    }
    const conversationFromFullName = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))
    const conversationFromUserName = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase()))

    if (conversationFromFullName) {
      setSelectedConversation(conversationFromFullName);
      setSearch("");
    } else if (conversationFromUserName) {
      setSelectedConversation(conversationFromUserName);
      setSearch("");
    } else toast.error("We don't know anyone with that name...but maybe you do?")
  }

  return (
    <form onSubmit={handleSubmit} className="join">
        <input type='text' className="input input-bordered border-gray-200 join-item rounded-l-full" placeholder="Look up a friend..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn join-item border-gray-200 rounded-r-full hover:bg-gradient-to-r hover:from-reden-teal hover:to-reden-blue hover:border-gray-200 hover:text-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
        </svg>


        </button>
    </form>

  )
}

export default SearchInput