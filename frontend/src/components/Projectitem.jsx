import React,{useContext} from "react";
import ProjectContext from "../context/project/ProjectContext.js";
import AlertContext from "../context/alerts/AlertContext";
const Projectitem = (props) => {
   const context = useContext(ProjectContext);
  const { deleteProject} = context;
  const { project ,updateProject} = props;
  const alertContext = useContext(AlertContext);
  const {Alerts} = alertContext;

 
return (
  <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

    {/* Project Header */}
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="min-w-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
          Project
        </span>

        <h2 className="text-xl font-bold text-gray-800 mt-1 wrap-break-word">
          {project.title}
        </h2>
      </div>

      <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-blue-100">
        <span className="material-symbols-outlined text-blue-500 text-2xl">
          folder_open
        </span>
      </div>
    </div>

    {/* Description */}
    <p className="min-h-12 text-sm leading-6 text-gray-500 mb-5">
      {project.description}
    </p>

    {/* Owner */}
    <div className="flex items-center gap-3 py-3 border-t border-gray-100">
      <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
        <span className="material-symbols-outlined text-orange-600">
          person
        </span>
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-400">Project Owner</p>
        <p className="text-sm font-semibold text-gray-800 truncate">
          {project.owner?.name}
        </p>
      </div>
    </div>

    {/* Members */}
    <div className="flex items-center gap-3 py-3 border-t border-gray-100">
      <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
        <span className="material-symbols-outlined text-purple-600">
          groups
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-400">Team Members</p>
        <p className="text-sm font-semibold text-gray-800 wrap-break-word">
          {project.members.map((member) => member.name).join(", ") || "No members"}
        </p>
      </div>
    </div>

    {/* Status & Date */}
    <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4 mt-2">
      <div className="flex items-center gap-2">
        <p className="text-xs text-gray-400 mb-2">Status</p>

        <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
          project.status === "completed"
            ? "bg-emerald-100 text-emerald-700"
            : project.status === "active"
            ? "bg-orange-100 text-orange-700"
            : "bg-gray-100 text-gray-600"
        }`}>
          {project.status}
        </span>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-400 mb-1">Created Date</p>
        <p className="text-sm font-medium text-gray-700">
         {new Date(project.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short",year: "numeric",
})}
        </p>
      </div>
    </div>

    {/* Actions */}
    <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-gray-100">

      <button
        onClick={() => updateProject(project)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors cursor-pointer text-sm font-semibold"
      >
        <span className="material-symbols-outlined text-lg">
          edit
        </span>
        Edit
      </button>

      <button
        onClick={() => {
          deleteProject(project._id);
          Alerts("Deleted successfully", "success");
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer text-sm font-semibold"
      >
        <span className="material-symbols-outlined text-lg">
          delete
        </span>
        Delete
      </button>

    </div>

  </div>
);

};

export default Projectitem;