import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../context/project/ProjectContext.js";
import Projectitem from "./Projectitem.jsx";
import EditProject from "./EditProject.jsx";
import { useNavigate } from "react-router-dom";
import { FolderKanban } from "lucide-react";
const Projects = () => {
  const context = useContext(ProjectContext);
  const { projects, getAllProjects } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
        getAllProjects();
    }else{
      navigate('/login');
    }
   
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const updateProject = (currentProject) => {
    setCurrentProject(currentProject);
    setShowModal(true);
  };
  
return (
  <div className="min-h-screen bg-slate-50 p-6 md:p-8">

    {/* Edit Modal */}
    {showModal && (
      <EditProject
        currentProject={currentProject}
        onClose={() => {
          setShowModal(false);
        }}
      />
    )}

    {/* Page Heading */}
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-3xl font-bold text-gray-800">
          Your Projects
        </h2>

        <span className="bg-emerald-100 text-emerald-700 text-sm font-semibold px-3 py-1 rounded-full">
          {projects.length}
        </span>
      </div>

      <p className="text-gray-500">
        Manage and track all your projects in one place.
      </p>
    </div>

    {/* Projects */}
    {projects.length === 0 ? (
      <div className="flex min-h-[50vh] flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl shadow-sm">
        <FolderKanban size={48} className="text-gray-300 mb-4" />

        <h3 className="text-xl font-bold text-gray-800">
          No Projects Yet
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          Your projects will appear here once you create one.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          return (
            <Projectitem
              key={project._id}
              project={project}
              updateProject={updateProject}
            />
          );
        })}
      </div>
    )}

  </div>
);

};

export default Projects;
