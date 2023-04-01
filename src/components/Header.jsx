import {TiLink} from 'react-icons/ti'

const Header = () => {
  return (
    <header className='flex justify-between items-center p-5 bg-white border border-gray-300 fixed top-0 left-0 right-0'>
        <a href='#' className='flex justify-start items-center text-xl text-black space-x-1'>
            <span>WellFund</span>
            <TiLink className='text-orange-400'/>
        </a>

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
