
import React, { useContext, useState, useEffect } from "react";
import ProjectContext from "../context/project/ProjectContext.js";
import AlertContext from "../context/alerts/AlertContext.js";

const AddProject = ({ onClose }) => {
  const context = useContext(ProjectContext);
  const { addProject, users, getAllUsers } = context;
  const alertContext = useContext(AlertContext);
  const {Alerts} = alertContext;

  const [project, setProject] = useState({
    title: "",
    description: "",
    members: [],
    status: "",
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  const createProject = (e) => {
    e.preventDefault();

    addProject(
      project.title,
      project.description,
      project.members,
      project.status
    );
    Alerts("project added successfully","success");
    onClose();
  };

  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (userId) => {
    setProject((prevProject) => ({
      ...prevProject,
      members: prevProject.members.includes(userId)
        ? prevProject.members.filter((id) => id !== userId)
        : [...prevProject.members, userId],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Create New Project
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Enter the details of your new project.
            </p>
          </div>

          <button
            className="rounded-lg px-3 py-1 text-2xl text-gray-400 hover:bg-gray-100"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Project Title */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text"
            placeholder="Enter project title"
            name="title"
            value={project.title}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
           minLength={5} required/>
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows="4"
            placeholder="Describe your project..."
            name="description"
            value={project.description}
            onChange={onChange} 
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          minLength={5} required/>
        </div>

        {/* Project Members */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Add Project Members
          </label>

          <div className="max-h-40 space-y-2 overflow-y-auto rounded-lg border border-gray-300 p-3">
            {users.map((user) => (
              <label
                key={user._id}
                className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-100"
              >
                <input type="checkbox"
                   checked={project.members.includes(user._id)}
                  onChange={() => handleMemberChange(user._id)}
                />

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>
              </label>
            ))}

            {users.length === 0 && (
              <p className="text-sm text-gray-500">
                No users available.
              </p>
            )}
          </div>

          <p className="mt-2 text-xs text-gray-500">
            {project.members.length} member(s) selected
          </p>
        </div>

        {/* Project Status */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Project Status
          </label>
          <select
            name="status"
            value={project.status}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-blue-500"
          >
            <option value="">Select project status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
          <button
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>

          <button disabled={project.title.length<5 ||project.description.length<5 }className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={createProject}
          >
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
