import AddButton from "../components/AddButton"
import CreateProject from "../components/CreateProject"
import Hero from "../components/Hero"
import Projects from "../components/Projects"

const Home = () => {
  return (
    <>
        <Hero/>
        <Projects/>
        <div className="flex justify-center items-center my-6">
            <button type='button'
                className='inline-block px-6 py-2.5 rounded-full bg-teal-500 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-teal-600'>
                    Load More
            </button>
        </div>
        <CreateProject />
        <AddButton />
    </>
  )
}

export default Home
