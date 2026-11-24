import React ,{useState ,useContext,useEffect} from "react";
import ProjectContext from "../context/project/ProjectContext";
import AlertContext from "../context/alerts/AlertContext";

const EditProject = ({currentProject, onClose }) => {
   const context = useContext(ProjectContext);
  const { editProject } = context;
   const alertContext = useContext(AlertContext);
  const {Alerts} = alertContext;

  const [project, setProject] = useState({id:"",etitle: "", edescription: "",estatus: ""});
  useEffect(() => {
  setProject({
    id: currentProject._id,
    etitle: currentProject.title,
    edescription: currentProject.description,
    estatus: currentProject.status
  });
}, [currentProject]);
    const updateProject = (e) => {
    e.preventDefault();
     editProject(project.id, project.etitle, project.edescription, project.estatus);
      Alerts("updated successfully","success")
    onClose();
  };
  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Project
          </h2>

          <button className="rounded-lg px-3 py-1 text-2xl text-gray-400 hover:bg-gray-100 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Project Title */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text" placeholder="Enter project title" id="etitle" name="etitle" value={project.etitle}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" onChange={onChange}  minLength={5} required/>
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea rows="4" placeholder="Describe your project..." id="edescription" name="edescription" value={project.edescription} className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          onChange={onChange}  minLength={5} required/>
        </div>
        
        {/* Status */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Project Status
          </label>
          <select id="estatus" name="estatus" value={project.estatus} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100" onChange={onChange}>
            <option value="">Select project status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
          <button className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:cursor-pointer" onClick={onClose}>
            Close
          </button>

          <button disabled={project.etitle.length<5 ||project.edescription.length<5 }className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"  onClick={updateProject}>
            Update
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditProject;