
import React, { useContext, useEffect, useState } from "react";
import TaskContext from "../context/task/TaskContext";
import EditTask from "./EditTask";
import AlertContext from "../context/alerts/AlertContext";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const context = useContext(TaskContext);
  const { tasks, getAllTasks, deleteTask } = context;

  const alertContext = useContext(AlertContext);
  const { Alerts } = alertContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllTasks();
    } else {
      navigate("/login");
    }
  }, []);

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const getStatusStyle = (status) => {
    switch (status) {
      case "done":
        return "bg-green-100 text-green-700";
      case "inProgress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "low":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          All Tasks
        </h2>
        <p className="text-gray-500 mt-2">
          Manage and track all your tasks in one place.
        </p>
      </div>

      {/* Empty State */}
      {tasks.length === 0 ? (
        <div className="flex min-h-[55vh] flex-col items-center justify-center bg-white rounded-2xl shadow-sm">
          <span className="material-symbols-outlined text-6xl text-gray-300">
            task_alt
          </span>
          <h3 className="text-xl font-semibold text-gray-700 mt-4">
            No tasks found
          </h3>
          <p className="text-gray-500 mt-2">
            Your tasks will appear here.
          </p>
        </div>
      ) : (

        /* Task Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
            >

              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">

                <h3 className="text-lg font-bold text-gray-800 wrap-break-word">
                  {task.title}
                </h3>

                <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${getPriorityStyle(task.priority)}`}>
                  {task.priority}
                </span>

              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 mt-3 min-h-11.25">
                {task.description || "No description provided."}
              </p>

              {/* Status */}
              <div className="mt-5">
                <p className="text-xs text-gray-400 font-semibold uppercase mb-2">
                  Status
                </p>

                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${getStatusStyle(task.status)}`}>
                  {task.status === "inProgress"
                    ? "In Progress"
                    : task.status === "done"
                    ? "Completed"
                    : "To Do"}
                </span>
              </div>

              {/* Due Date */}
              <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
                <span className="material-symbols-outlined text-lg">
                  calendar_month
                </span>

                <span>
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "No due date"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end items-center gap-3 border-t border-gray-100 mt-5 pt-4">

                <button
                  onClick={() => {
                    setCurrentTask(task);
                    setShowEditModal(true);
                  }}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition"
                >
                  <span className="material-symbols-outlined text-lg">
                    edit_square
                  </span>
                  Edit
                </button>

                <button
                  onClick={() => {
                    deleteTask(task._id);
                    Alerts("deleted successfully", "success");
                  }}
                  className="flex items-center gap-1 text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition"
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && currentTask && (
        <EditTask
          currentTask={currentTask}
          onClose={() => setShowEditModal(false)}
        />
      )}

    </div>
  );
};

export default Tasks;
