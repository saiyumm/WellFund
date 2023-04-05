import { useEffect } from "react"
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
  const [project] = useGlobalState('project')

  useEffect(async () => {
    await loadProject(id)
  }, [])
  return (
    <>
        <ProjectDetails project={project} />
        <ProjectBackers />
        <UpdateProject />
        <DonateProject />
        <DeleteProject />
    </>
  )
}

export default Project
