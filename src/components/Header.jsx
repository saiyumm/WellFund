import { TiLink } from 'react-icons/ti'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='flex justify-between items-center p-5 lg:px-14 bg-white border border-gray-300 fixed top-0 left-0 right-0 border-r-0'>
        <Link to="/" className='flex justify-start items-center text-xl text-black space-x-1'>
            <span>WellFund</span>
            <TiLink className='text-orange-400'/>
        </Link>

        <div className='flex space-x-2 justify-center'>
            <button 
                type='button'
                className='inline-block px-6 py-2.5 rounded-xl bg-teal-500 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-teal-600'>
                    Connect Wallet
            </button>
        </div>
    </header>
  )
}

export default Header
