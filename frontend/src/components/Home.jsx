
import React, { useState, useEffect  } from "react";
import AddProject from "./AddProject";
import AddTask from "./AddTask";
import Projects from "./Projects";
import Overview from "../components/Overview.jsx";
import { useNavigate } from "react-router-dom";
import RecentActivity from "./RecentActivity.jsx";

const Home = () => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
          navigate('/');
    }else{
      navigate('/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-10">

      {/* Page Header */}
      <div className="my-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 text-center">
          Welcome to Pro Task
        </h1>

        <p className="mt-2 text-sm text-gray-500 md:text-base text-center">
          Create and manage your projects and tasks in one place.
        </p>
      </div>
       <Overview/>
       
{/* Dashboard Bottom Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-5">

    <RecentActivity />

{/* Quick Actions */}
<div className="mb-8">

  {/* Heading */}
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800">
      Quick Actions
    </h2>
    <p className="text-sm text-gray-500 mt-1">
      Manage your workspace by creating projects and assigning tasks.
    </p>
  </div>

  {/* Action Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Add Project */}
    <button
      onClick={() => setShowProjectModal(true)}
      className="group w-full flex items-center justify-between p-7 rounded-2xl bg-linear-to-br from-blue-50 to-white border border-blue-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 cursor-pointer text-left"
    >
      <div>
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 mb-5">
          <span className="material-symbols-outlined text-blue-500 text-3xl">
            create_new_folder
          </span>
        </div>

        <h3 className="font-bold text-gray-800 text-xl mb-1">
          Add Project
        </h3>

        <p className="text-sm text-gray-500">
          Create and organize a new project
        </p>
      </div>

      <span className="material-symbols-outlined text-blue-400 group-hover:translate-x-1 transition-transform duration-300">
        arrow_forward
      </span>
    </button>

    {/* Add Task */}
    <button
      onClick={() => setShowTaskModal(true)}
      className="group w-full flex items-center justify-between p-7 rounded-2xl bg-linear-to-br from-green-50 to-white border border-green-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-green-300 transition-all duration-300 cursor-pointer text-left"
    >
      <div>
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 mb-5">
          <span className="material-symbols-outlined text-green-600 text-3xl">
            add_task
          </span>
        </div>

        <h3 className="font-bold text-gray-800 text-xl mb-1">
          Add Task
        </h3>

        <p className="text-sm text-gray-500">
          Create and assign a new task
        </p>
      </div>

      <span className="material-symbols-outlined text-green-400 group-hover:translate-x-1 transition-transform duration-300">
        arrow_forward
      </span>
    </button>

  </div>
</div>


</div>
      {/* Project Modal */}
      {showProjectModal && (
        <AddProject onClose={() => setShowProjectModal(false)} />
      )}

      {/* Task Modal */}
      {showTaskModal && (
        <AddTask onClose={() => setShowTaskModal(false)} />
      )}
       
    </div>
  );
};

export default Home;
