import { useContext, useEffect} from "react";
import TaskContext from "../context/task/TaskContext";
import ProjectContext from "../context/project/ProjectContext";
import RecentActivity from "./RecentActivity";
const Overview = () => {
  const context = useContext(TaskContext);
  const {tasks, getAllTasks} = context;
  const projectContext = useContext(ProjectContext);
  const {projects, getAllProjects} = projectContext;
  const completedTasks = tasks.filter( (task) => task.status === "done").length;
  const pendingTasks = tasks.filter( (task) => task.status === "todo").length;
  useEffect(()=>{
     getAllTasks();
  },[]);
   useEffect(()=>{
     getAllProjects();
  },[]);
   const teamMembers = new Set();
   projects.forEach(project => {
       teamMembers.add(project.owner._id);
       project.members.forEach(member => {
       teamMembers.add(member._id);
  });
  });
 
return (
  <div className="p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">

      {/* Total Projects */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Total Projects</span>
          <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
            <span className="material-symbols-outlined">folder</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-800">{projects.length}</p>
        <p className="text-xs text-gray-400 mt-2">Projects in workspace</p>
      </div>

      {/* Total Tasks */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Total Tasks</span>
          <div className="bg-green-100 text-green-600 p-2 rounded-lg">
            <span className="material-symbols-outlined">checklist_rtl</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-800">{tasks.length}</p>
        <p className="text-xs text-gray-400 mt-2">Tasks in workspace</p>
      </div>

      {/* Completed Tasks */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Completed Tasks</span>
          <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
            <span className="material-symbols-outlined">task_alt</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-800">{completedTasks}</p>
        <p className="text-xs text-gray-400 mt-2">Tasks completed</p>
      </div>

      {/* Pending Tasks */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Pending Tasks</span>
          <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-800">{pendingTasks}</p>
        <p className="text-xs text-gray-400 mt-2">Tasks awaiting completion</p>
      </div>

      {/* Team Members */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">Team Members</span>
          <div className="bg-cyan-100 text-cyan-600 p-2 rounded-lg">
            <span className="material-symbols-outlined">group</span>
          </div>
        </div>
        <p className="text-3xl font-bold text-gray-800">{teamMembers.size}</p>
        <p className="text-xs text-gray-400 mt-2">Members in workspace</p>
      </div>

    </div>
  </div>
);

}

export default Overview