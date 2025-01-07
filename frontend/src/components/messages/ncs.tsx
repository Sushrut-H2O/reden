import { useAuthContext } from '../../context/AuthContext'
import redenLogo from './assets/reden.png'

const NCS = () => {
  const {authUser} = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full'>
        <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 flex flex-col items-center gap-2'>
            <img 
                src={redenLogo}
                className='h-40 pb-4'
            />
            <p className='font-semibold'>Welcome, {authUser?.fullName}!</p>
            <p>Select a chat and start spilling those beans!</p>
        </div>
    </div>
  )
}

export default NCS