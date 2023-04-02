import { FaTimes } from 'react-icons/fa'
import { useGlobalState, setGlobalState } from '../store'

const CreateProject = () => {
    const [createModal] = useGlobalState("createModal")

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40 transform transition-transform duration-700 ${createModal}`}>
            <div className="bg-white shadow-md shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <form className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Add Project</p>
                        <button
                            onClick={() => setGlobalState("createModal",'scale-0')}
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

                    <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                        <input 
                            className='block w-full bg-transparent border-0 text-small text-slate-800 focus:outline-none focus:ring-0' 
                            type="text"
                            name="title"
                            placeholder='Title'
                            required
                        />
                    </div>

                    <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                        <input 
                            className='block w-full bg-transparent border-0 text-small text-slate-800 focus:outline-none focus:ring-0' 
                            type="number"
                            step={0.01}
                            min={0.01}
                            name="amount"
                            placeholder='Amount (ETH)'
                            required
                        />
                    </div>

                    <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                        <input 
                            className='block w-full bg-transparent border-0 text-small text-slate-800 focus:outline-none focus:ring-0' 
                            type="date"
                            name="date"
                            placeholder='Expiry Date'
                            required
                        />
                    </div>

                    <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                        <input 
                            className='block w-full bg-transparent border-0 text-small text-slate-800 focus:outline-none focus:ring-0' 
                            type="url"
                            name="imageURL"
                            placeholder='Image URL'
                            required
                        />
                    </div>

                    <div className='flex justify-between items-center bg-gray-300 rounded-xl mt-5'>
                        <textarea
                            className='block w-full bg-transparent border-0 text-small text-slate-800 focus:outline-none focus:ring-0' 
                            type="text"
                            name="description"
                            placeholder='Description'
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
