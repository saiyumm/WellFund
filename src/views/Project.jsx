import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DeleteProject from "../components/DeleteProject"
import DonateProject from "../components/DonateProject"
import ProjectBackers from "../components/ProjectBackers"
import ProjectDetails from "../components/ProjectDetails"
import UpdateProject from "../components/UpdateProject"
import { loadProject } from "../services/blockchain"
import { useGlobalState } from "../store"

const Project = () => {
  const { id } = useParams()
  const [loaded, setLoaded] = useState(false)
  const [project] = useGlobalState('project')

  useEffect(async () => {
    await loadProject(id)
    setLoaded(true)
  }, [])
  return loaded ? (
    <>
        <ProjectDetails project={project} />
        <UpdateProject project={project} />
        <DeleteProject project={project} />
        <DonateProject project={project} />
        <ProjectBackers />
    </>
  ) : null
}

export default Project
