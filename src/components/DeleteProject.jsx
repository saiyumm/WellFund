import { FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { deleteProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const DeleteProject = ({ project }) => {
    const [deleteModal] = useGlobalState("deleteModal")
    const navigate = useNavigate()

    // to handle delete requests
    const handleSubmit = async () => {
        await deleteProject(project?.id)
        toast.success('Project deleted successfully, will reflect in 30 seconds')
        setGlobalState("deleteModal",'scale-0')
        navigate("/")   // as per new react version use navigate only instead of navigate.push
    }

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40 transform transition-transform duration-700 ${deleteModal}`}>
            <div className="bg-white shadow-md shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">{project?.title}</p>
                        <button
                            onClick={() => setGlobalState("deleteModal",'scale-0')}
                            type="button" 
                            className="border-0 bg-transparent focus:outline-none">
                            <FaTimes />
                        </button>
                    </div>

                    <div className='flex justify-center items-center mt-5'>
                        <div className='rounded-xl overflow-hidden h-20 w-20'>
                            <img 
                                src={project?.imageURL || 'https://media.istockphoto.com/vectors/vector-crowdfunding-concept-in-flat-style-vector-id508447789'}
                                alt={project?.title} 
                                className='h-full w-full object-cover cursor-pointer'/>
                        </div>
                    </div>

                    <div className='flex justify-center items-center rounded-xl mt-5 flex-col'>
                        <p>Are you sure ?</p>
                        <small className='text-red-500 text-xs font-semibold'>This is irreversible</small>
                    </div>

                    <button 
                        className='inline-block px-6 py-2.5 rounded-xl bg-red-600 text-white font-medium text-md leading-tight shadow-md hover:bg-red-700 mt-5'
                        onClick={handleSubmit}
                    >
                            Delete Project
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteProject
