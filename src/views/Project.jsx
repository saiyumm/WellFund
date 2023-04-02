import DeleteProject from "../components/DeleteProject"
import DonateProject from "../components/DonateProject"
import ProjectBackers from "../components/ProjectBackers"
import ProjectDetails from "../components/ProjectDetails"
import UpdateProject from "../components/UpdateProject"

const Project = () => {
  return (
    <>
        <ProjectDetails />
        <ProjectBackers />
        <UpdateProject />
        <DonateProject />
        <DeleteProject />
    </>
  )
}

export default Project
