import Sidebar from "../../components/sidebar/sidebar"
import MessageContainer from "../../components/messages/messagecontainer"

const Home = () => {
  return (
    <div className="flex w-full overflow-hidden">
        <Sidebar />
        <MessageContainer />
    </div>
  )
}

export default Home