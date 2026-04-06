import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ProjectDetails() {
  const { id } = useParams();

  const project = useSelector((state) =>
    state.projects.projects.find((p) => p.id.toString() === id)
  );

  if (!project) {
    return (
      <div className="p-10 text-gray-900">
        <h1>Project not found</h1>
      </div>
    );
  }

  return (
    <div className="p-10 text-gray-900">
      <h1 className="text-3xl font-bold text-gray-800">{project.title}</h1>

      <div className="mt-6 bg-gray-900 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-white">Details</h2>
        <p className="text-gray-400">{project.details}</p>
      </div>
    </div>
  );
}

export default ProjectDetails;