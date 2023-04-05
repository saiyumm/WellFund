import { Link } from 'react-router-dom'
import Identicons from 'react-identicons'
import { daysRemaining, truncate } from '../store'
import { FaEthereum } from 'react-icons/fa'

const Projects = ({ projects }) => {
  return (
    <div className="flex flex-col px-6">
        <div className="flex justify-center items-center flex-wrap">
            {projects.map((project, i) => (
                    <ProjectCard key={i} project={project} />
                ))}
        </div>
    </div>
  )
}

const ProjectCard = ({project }) => (
    <div id="projects" className="rounded-lg shadow-lg bg-white w-64 m-4">
        <Link to={'/projects/' + project.id}>
            <img 
                src={project.imageURL} 
                alt={project.title}
                className='rounded-xl h-64 w-full object-cover'/>

            <div className='p-4'>
                <h5>{project.title}</h5>           

                <div className='flex flex-col'>
                    <div className='flex justify-between items-center mb-3'>
                        <Identicons 
                            className='rounded-full shadow-md' 
                            string={project.owner} 
                            size={15} 
                        />
                        <small className='text-gray-700'>{truncate(project.owner, 4, 4, 11)}</small>
                    </div>

                    <small className='text-gray-500 mb-1'>
                        {new Date().getTime() > Number(project.expiresAt + '000') 
                        ? 'Expired' 
                        : daysRemaining(project.expiresAt)}{" "}
                    left
                    </small>
                </div>

                <div className='w-full bg-gray-300'>
                    <div className='bg-teal-600 text-xs font-medium text-teal-300 text-center p-0.5 leading-none rounded-full'
                    style={{width: `${(project.raised / project.cost) * 100}`}}></div>
                </div>

                <div className='flex justify-between items-center font-bold mt-1 mb-2 text-gray-700'>
                    <small>{project.raised} ETH Raised</small>
                    <small className='flex justify-start items-center'>
                        <FaEthereum />
                        <span>{project.cost} ETH</span>
                    </small>
                </div>

                <div className='flex justify-between items-center flex-wrap mt-4 mb-2 text-gray-500 font-bold'>
                    <small>
                        {project.backers} Backer{project.backers == 1 ? '' : 's'}
                    </small>
                    <div>
                        {project.status == 0 ? (
                            <small className='text-gray-500'>Open</small>
                        ) : project.status == 1 ? (
                            <small className='text-green-500'>Accepted</small>
                        ) : project.status == 2 ? (
                            <small className='text-gray-500'>Reverted</small>
                        ) : project.status == 3 ? (
                            <small className='text-red-500'>Deleted</small>
                        ) : (
                            <small className='text-orange-500'>Paid</small>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    </div>
)

export default Projects
