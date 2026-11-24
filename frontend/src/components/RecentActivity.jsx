
import React, { useContext } from "react";
import ProjectContext from "../context/project/ProjectContext";
import TaskContext from "../context/task/TaskContext";
import { FolderPlus, ListTodo } from "lucide-react";

const RecentActivity = () => {
  const projectContext = useContext(ProjectContext);
  const { projects } = projectContext;

  const taskContext = useContext(TaskContext);
  const { tasks } = taskContext;

  const projectActivities = projects.map((project) => {
    return {
      id: project._id,
      title: project.title,
      type: "Project",
      date: project.createdAt,
    };
  });

  const taskActivities = tasks.map((task) => {
    return {
      id: task._id,
      title: task.title,
      type: "Task",
      date: task.createdAt,
    };
  });

  const allActivities = [...projectActivities, ...taskActivities];

  allActivities.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const recentActivities = allActivities.slice(0, 3);

  return (
   
<div className="space-y-5 w-full max-w-xl">

  {/* Section Heading */}
  <div>
    <div className="flex items-center gap-2">
      <h2 className="text-2xl font-bold text-gray-800">
        Recent Activity
      </h2>
      <span className="material-symbols-outlined text-blue-500">
        history
      </span>
    </div>

    <p className="text-sm text-gray-500 mt-1">
      Latest updates across your workspace
    </p>
  </div>

  {/* Empty State */}
  {recentActivities.length === 0 ? (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
      <span className="material-symbols-outlined text-4xl text-gray-300">
        notifications_none
      </span>
      <p className="text-gray-500 text-sm mt-2">
        No recent activities to display.
      </p>
    </div>
  ) : (

    /* Activity List */
    <div className="space-y-3">
      {recentActivities.map((recentActivity) => {
        return (
          <div
            key={`${recentActivity.type}-${recentActivity.id}`}
            className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200 transition-all duration-300"
          >
            <div className="flex justify-between items-center gap-3">

              {/* Activity Icon and Title */}
              <div className="flex items-center gap-3 min-w-0">

                <div
                  className={`w-11 h-11 flex items-center justify-center rounded-xl shrink-0 ${
                    recentActivity.type === "Project"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {recentActivity.type === "Project" ? (
                    <FolderPlus size={21} />
                  ) : (
                    <ListTodo size={21} />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-800 text-base truncate group-hover:text-blue-600 transition-colors">
                    {recentActivity.title}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    New {recentActivity.type.toLowerCase()} created
                  </p>
                </div>
              </div>

              {/* Activity Badge */}
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-semibold shrink-0 ${
                  recentActivity.type === "Project"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-purple-50 text-purple-600"
                }`}
              >
                {recentActivity.type}
              </span>
            </div>

            {/* Activity Date */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
              <span className="material-symbols-outlined text-gray-400 text-lg">
                calendar_today
              </span>

              <p className="text-xs font-medium text-gray-500">
                {new Date(recentActivity.date).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </p>
            </div>

          </div>
        );
      })}
    </div>
  )}
</div>
  )
};

export default RecentActivity;
