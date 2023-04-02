import Identicons from 'react-identicons'
import { FaEthereum } from 'react-icons/fa'
import { setGlobalState } from '../store'

const ProjectDetails = () => {
  return (
    <div className="py-28 px-6 flex justify-center">
      <div className='flex justify-center flex-col md:w-2/3'>
        <div className="flex justify-start items-start sm:space-x-4 flex-wrap">
            <img src='https://ksr-ugc.imgix.net/assets/039/605/244/5c485420112ae621ad37bd8e1bb2b3ca_original.png?ixlib=rb-4.0.2&w=680&fit=max&v=1673005621&gif-q=50&lossless=true&s=7a578a2fd45356ee5b6d90c0ad51329c' alt='projectImage' className='rounded-xl h-64 w-full object-cover sm:w-1/3'/>

            <div className="flex-1 sm:py-0 p-4">
                <div className="flex flex-col justify-start flex-wrap">
                    <h5 className="text-gray-900 text-sm font-medium mb-2">Rethinking the Idea of the Guitar Pick</h5>
                    <small className="text-gray-500">3 days left</small>
                </div>

                <div className="flex justify-between items-center w-full pt-2">
                    <div className="flex justify-start space-x-2 mb-3">
                        <Identicons className="rounded-full shadow-md" string="0x9e...13af" size={15} />
                        <small className="text-gray-700">0x9e...13af</small>
                        <small className="text-gray-500 font-bold">{16} Backings</small>
                    </div>

                    <div className="font-bold ">
                        <small className="text-gray-500 ">Open</small>
                    </div>
                </div>
            </div>
        </div>
        <p className='text-sm font-light mt-2'>
            Premium guitar picks, combining the finest materials and design, with the most advanced technology to improve your playing experience. We create everyday guitar picks that feel special in terms of designs, tone, ergonomics, and function.
        </p>
        <div className='w-full bg-gray-300  mt-4'>
            <div className='bg-teal-600 text-xs font-medium text-teal-300 text-center p-0.5 leading-none rounded-full'
            style={{width: '70%'}}></div>
        </div>

        <div className='flex justify-between items-center font-bold mt-2'>
            <small>{3} ETH Raised</small>
            <small className='flex justify-start items-center'>
                <FaEthereum />
                <span>{10} ETH</span>
            </small>
        </div>

        <div className="flex justify-start items-center space-x-3 mt-4">
            <button type='button'
                className='inline-block px-6 py-2.5 rounded-xl bg-green-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-green-700'
                onClick={() => setGlobalState('donateModal', 'scale-100')}
                >
                    Donate
            </button>
            <button type='button'
                className='inline-block px-6 py-2.5 rounded-xl bg-gray-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-gray-700'
                onClick={() => setGlobalState('updateModal', 'scale-100')}
                >
                    Edit
            </button>
            <button type='button'
                className='inline-block px-6 py-2.5 rounded-xl bg-red-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-red-700'
                onClick={() => setGlobalState('deleteModal', 'scale-100')}
                >
                    Delete
            </button>
            <button type='button'
                className='inline-block px-6 py-2.5 rounded-xl bg-teal-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-teal-700'>
                    Payout
            </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
