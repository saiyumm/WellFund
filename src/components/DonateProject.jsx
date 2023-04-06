import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalState, setGlobalState } from '../store'
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { donateProject } from '../services/blockchain';

const DonateProject = ({ project }) => {
    const [donateModal] = useGlobalState("donateModal")
    // creating a useState variable
    const [amount, setAmount] = useState('')

    // to handle new donation / backing
    const handleSubmit = async (e) => {
        e.preventDefault()
        // validation and condition
        if(!amount) return

        await donateProject(project?.id, amount)
        toast.success('Project backed successfully, will reflect in 30 seconds')
        setGlobalState("donateModal",'scale-0')
        setTimeout(function(){
            window.location.reload(1);
            }, 20000);
    }

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40 transform transition-transform duration-700 ${donateModal}`}>
            <div className="bg-white shadow-md shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">{project?.title}</p>
                        <button
                            onClick={() => setGlobalState("donateModal",'scale-0')}
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

                    <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                        <input 
                            className='block w-full bg-transparent border-0 text-small text-slate-800 focus:outline-none focus:ring-0' 
                            type="number"
                            step={0.01}
                            min={0.01}
                            name="amount"
                            placeholder='Amount (ETH)'
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                            required
                        />
                    </div>

                    <button type='submit'
                        className='inline-block px-6 py-2.5 rounded-xl bg-green-600 text-white font-medium text-md leading-tight shadow-md hover:bg-teal-700 mt-5'>
                            Back Project
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DonateProject
