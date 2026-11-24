import React, { useContext, useState, useEffect } from "react";
import TaskContext from "../context/task/TaskContext";
import ProjectContext from "../context/project/ProjectContext";
import AlertContext from "../context/alerts/AlertContext";
const AddTask = ({ onClose }) => {
  const context = useContext(TaskContext);
  const { createTask } = context;
  const projectContext = useContext(ProjectContext);
  const alertContext = useContext(AlertContext);
  const {Alerts} = alertContext;
  const { projects,getMembers } = projectContext;

  const [task, setTask] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
  });
  const selectedProject = projects.find(
  (project) => project._id === task.project
);

const [projectMembers,setProjectMembers] = useState([]);
useEffect(() => {
  const fetchMembers = async () => {
    if (selectedProject && selectedProject.members.length > 0) {
      const members = await getMembers(selectedProject.members);
      setProjectMembers(members);
    } else {
      setProjectMembers([]);
    }
  };
  fetchMembers();
}, [selectedProject]);
  const handleTask = (e) => {
    e.preventDefault();

    createTask(
      task.title,
      task.description,
      task.project,
      task.assignedTo,
      task.priority,
      task.status,
      task.dueDate,
    );
    Alerts("Task added successfully","success");
    onClose();
  };
  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Create New Task</h2>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-800"
          >&times;
          </button>
        </div>
        {/* form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            id="title"
            name="title"
            value={task.title}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            onChange={onChange}  minLength={5} required/>

          <textarea
            placeholder="Task description"
            id="description"
            name="description"
            value={task.description}
            rows="3"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            onChange={onChange}  minLength={5} required/>

          <select name="project" value={task.project}  onChange={onChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2">
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>

          <select className="w-full rounded-lg border border-gray-300 px-4 py-2"
            id="assignedTo" name="assignedTo" value={task.assignedTo} onChange={onChange}>
            <option value="">Assign To</option>
             {projectMembers.map((member)=> {return (
                <option key={member._id} value={member._id}>{member.name}
              </option>
            )})}
          </select>

          <div className="grid grid-cols-2 gap-4">
            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              id="priority"
              name="priority"
              value={task.priority}
              onChange={onChange}
            >
              <option value="">Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              id="status"
              name="status"
              value={task.status}
              onChange={onChange}
            >
              <option value="">Status</option>
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
          >
            Cancel
          </button>

          <button disabled={task.title.length<5 ||task.description.length<5 }
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={handleTask}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
