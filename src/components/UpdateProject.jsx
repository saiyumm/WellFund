import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from "react-toastify"
import { updateProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'
import 'react-toastify/dist/ReactToastify.css';


const UpdateProject = ({ project }) => {
    const [updateModal] = useGlobalState('updateModal')
    //variables needed for submission
    const [title, setTitle] = useState(project?.title)
    const [description, setDescription] = useState(project?.description)
    const [date, setDate] = useState(project?.date)
    const [imageURL, setImageURL] = useState(project?.imageURL)

    //take a particular date string and 
    const toTimestamp = (dateStr) => {
        const dateObj = Date.parse(dateStr)
        return dateObj / 1000
    }

    // to handle new create requests
    const handleSubmit = async (e) => {
        e.preventDefault()
        // validation and condition
        if(!title || !description || !date || !imageURL) return

        const params = {
            id: project?.id,
            title,
            description,
            expiresAt: toTimestamp(date),
            imageURL,
        }

        await updateProject(params)
        toast.success('Project updated successfully, will reflect in 30 seconds')
        onClose()
    }

    // fires whenever we close the create new campaign form
    const onClose = () => {
        setGlobalState('updateModal', 'scale-0')
    }

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40 transform transition-transform duration-700 ${updateModal}`}>
            <div className="bg-white shadow-md shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Edit Project</p>
                        <button
                            // onClick={() => setGlobalState("updateModal",'scale-0')}
                            onClick={onClose}   // replaced the command with newly created onClose function
                            type="button" 
                            className="border-0 bg-transparent focus:outline-none">
                            <FaTimes />
                        </button>
                    </div>

                    <div className='flex justify-center items-center mt-5'>
                        <div className='rounded-xl overflow-hidden h-20 w-20'>
                            <img src= {imageURL || 'https://media.istockphoto.com/vectors/vector-crowdfunding-concept-in-flat-style-vector-id508447789'}
                            alt='projectImage' 
                            className='h-full w-full object-cover cursor-pointer'/>
                        </div>
                    </div>

                    <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                        <input 
                            className='block w-full bg-transparent border-0 text-small text-slate-800 focus:outline-none focus:ring-0' 
                            type="text"
                            name="title"
                            placeholder='Title'
                            // to update -- when get new entry
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                        />
                    </div>

                    <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                        <input 
                            className='block w-full bg-transparent border-0 text-small text-slate-800 focus:outline-none focus:ring-0' 
                            type="date"
                            name="date"
                            placeholder='Expiry Date'

                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            required
                        />
                    </div>

                    <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                        <input 
                            className='block w-full bg-transparent border-0 text-small text-slate-800 focus:outline-none focus:ring-0' 
                            type="url"
                            name="imageURL"
                            placeholder='Image URL'

                            onChange={(e) => setImageURL(e.target.value)}
                            value={imageURL}
                            required
                        />
                    </div>

                    <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                        <textarea
                            className='block w-full bg-transparent border-0 text-small text-slate-800 focus:outline-none focus:ring-0' 
                            type="text"
                            name="description"
                            placeholder='Description'

                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required 
                        ></textarea>
                    </div>

                    <button type='submit'
                        className='inline-block px-6 py-2.5 rounded-xl bg-teal-600 text-white font-medium text-md leading-tight shadow-md hover:bg-teal-700 mt-5'>
                            Update Project
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProject
