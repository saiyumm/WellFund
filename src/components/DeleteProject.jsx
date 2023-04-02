import { FaTimes } from 'react-icons/fa'
import { useGlobalState, setGlobalState } from '../store'

const DeleteProject = () => {
    const [deleteModal] = useGlobalState("deleteModal")

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40 transform transition-transform duration-700 ${deleteModal}`}>
            <div className="bg-white shadow-md shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <form className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Project Title</p>
                        <button
                            onClick={() => setGlobalState("deleteModal",'scale-0')}
                            type="button" 
                            className="border-0 bg-transparent focus:outline-none">
                            <FaTimes />
                        </button>
                    </div>

                    <div className='flex justify-center items-center mt-5'>
                        <div className='rounded-xl overflow-hidden h-20 w-20'>
                            <img src='https://ksr-ugc.imgix.net/assets/039/605/244/5c485420112ae621ad37bd8e1bb2b3ca_original.png?ixlib=rb-4.0.2&w=680&fit=max&v=1673005621&gif-q=50&lossless=true&s=7a578a2fd45356ee5b6d90c0ad51329c' alt='projectImage' className='h-full w-full object-cover cursor-pointer'/>
                        </div>
                    </div>

                    <div className='flex justify-center items-center rounded-xl mt-5 flex-col'>
                        <p>Are you sure ?</p>
                        <small className='text-red-500 text-xs font-semibold'>This is irreversible</small>
                    </div>

                    <button type='submit'
                        className='inline-block px-6 py-2.5 rounded-xl bg-red-600 text-white font-medium text-md leading-tight shadow-md hover:bg-red-700 mt-5'>
                            Delete Project
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DeleteProject
