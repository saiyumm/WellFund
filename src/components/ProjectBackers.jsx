import { FaEthereum } from 'react-icons/fa'
import Identicons from 'react-identicons'

const ProjectBackers = () => {
  return (
    <div className="flex flex-col px-6 justify-center items-center md:w-2/3 mx-auto">
        <div className="max-h-[calc(100vh_-_25rem)] overflow-y-auto shadow-md rounded-md w-full mb-10">
            <table className="min-w-full">
                <thead className="border-b">
                    <tr>
                        <th scope="col" className="text-small font-medium px-6 py-4 text-left">Backer</th>
                        <th scope="col" className="text-small font-medium px-6 py-4 text-left">Donations</th>
                        <th scope="col" className="text-small font-medium px-6 py-4 text-left">Refunded</th>
                        <th scope="col" className="text-small font-medium px-6 py-4 text-left">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {Array(10).fill().map((backing, i) => (
                        <tr key={i} className="border-b border-gray-200">
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                            <div className='flex justify-start items-center space-x-2'>
                                <Identicons className="h-10 w-10 object-contain rounded-full shadow-md" 
                                    string={"0x2e...042a" + i } 
                                    size={25} />
                                    <span className=''>0x2e...042{i}</span>
                            </div>
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                            <small className='flex justify-start items-center space-x-1'>
                                <FaEthereum />
                                <span className='text-gray-700 font-medium'>{3} ETH</span>
                            </small>
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                            {false ? 'Yes':'No'}
                        </td>
                        <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                            {new Date().getTime()}
                        </td>
                    </tr>
                    ) )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProjectBackers
