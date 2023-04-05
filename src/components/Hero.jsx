import { setGlobalState, useGlobalState } from "../store"

const Hero = () => {
    const [stats] = useGlobalState('stats')

  return (
    <div className="mx-auto justify-center text-center py-24 px-6 bg-white text-gray-800 w-11/12">
        <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12 mt-24">
            <span className="capitalize">
                Bring your dreams to life with
            </span>
            <br />
            <span className="inline-block text-yellow-600 mt-3">WellFund</span>
        </h1>
        <div className="flex justify-center items-center space-x-3">
            <button type='button'
                className='inline-block px-6 py-2.5 rounded-xl border border-teal-500 bg-teal-500 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-teal-600'
                onClick={() => setGlobalState("createModal",'scale-100')}>
                    Create Campaign
            </button>
        
            <button type='button'
                className='inline-block px-6 py-2.5 rounded-xl border border-teal-500 bg-white text-teal-800 font-medium text-xs leading-tight uppercase shadow-md hover:bg-teal-500 hover:text-white'>
                    Fund Existing Campaign
            </button>
        </div>

        <div className="flex justify-center items-center mt-14 space-x-3 w-11/12 mx-auto">
            <div className="flex flex-col justify-center items-center h-20 border border-gray-400 rounded-2xl shadow-md w-full">
                <span className="text-lg font-bold text-teal-600 leading-5">{stats?.totalProjects || 0}</span>
                <span>Projects</span>
            </div>
            
            <div className="flex flex-col justify-center items-center h-20 border border-gray-400 rounded-2xl shadow-md w-full">
                <span className="text-lg font-bold text-teal-600 leading-5">{stats?.totalBacking || 0}</span>
                <span>Backings</span>
            </div>
            
            <div className="flex flex-col justify-center items-center h-20 border border-gray-400 rounded-2xl shadow-md w-full">
                <span className="text-lg font-bold text-teal-600 leading-5">{stats?.totalDonations || 0} ETH</span>
                <span>Donated</span>
            </div>
        </div>
    </div>
  )
}

export default Hero
