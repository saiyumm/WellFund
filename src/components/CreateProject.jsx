import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from "react-toastify"
import { createProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'
import 'react-toastify/dist/ReactToastify.css';


const CreateProject = () => {
    const [createModal] = useGlobalState('createModal')
    //variables needed for submission
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState('')
    const [date, setDate] = useState('')
    const [imageURL, setImageURL] = useState('')

    //take a particular date string and 
    const toTimestamp = (dateStr) => {
        const dateObj = Date.parse(dateStr)
        return dateObj / 1000
    }

    // to handle new create requests
    const handleSubmit = async (e) => {
        e.preventDefault()
        // validation and condition
        if(!title || !description || !cost || !date || !imageURL) return

        const params = {
            title,
            description,
            cost,
            expiresAt: toTimestamp(date),
            imageURL,
        }

        await createProject(params)
        toast.success('Project created successfully, will reflect in 30 seconds')
        onClose()
        setTimeout(function(){
            window.location.reload(1);
            }, 20000);
    }

    // fires whenever we close the create new campaign form
    const onClose = () => {
        setGlobalState('createModal', 'scale-0')
        reset()
    }

    //to reset the new campaign form
    const reset = () => {
        setTitle('')
        setCost('')
        setDescription('')
        setImageURL('')
        setDate('')
    }

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40 transform transition-transform duration-700 ${createModal}`}>
            <div className="bg-white shadow-md shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Add Project</p>
                        <button
                            // onClick={() => setGlobalState("createModal",'scale-0')}
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
                            type="number"
                            step={0.01}
                            min={0.01}
                            name="cost"
                            placeholder='Amount (ETH)'

                            onChange={(e) => setCost(e.target.value)}
                            value={cost}
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
                            Submit Project
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateProject
