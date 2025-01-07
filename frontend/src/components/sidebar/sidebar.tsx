import SearchInput from "./searchinput"
import Conversations from "./conversations"
import Logout from "./logout"

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col min-h-[93vh]">
        <SearchInput />
        <div className='divider py-3'/>
        <Conversations />
        <div className='divider py-3'/>
        <Logout />
    </div>
  )
}

export default Sidebar