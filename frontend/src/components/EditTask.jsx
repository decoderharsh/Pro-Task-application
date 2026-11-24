import React, { useContext, useState, useEffect } from "react";
import TaskContext from "../context/task/TaskContext";
import ProjectContext from "../context/project/ProjectContext";
import AlertContext from "../context/alerts/AlertContext";
const EditTask = ({ onClose ,currentTask  }) => {
  const context = useContext(TaskContext);
  const { editTask } = context;
  const projectContext = useContext(ProjectContext);
  const { projects,getMembers } = projectContext;
   const alertContext = useContext(AlertContext);
  const {Alerts} = alertContext;
  const [task, setTask] = useState({
    id:"",
    etitle: "",
    edescription: "",
    eassignedTo: "",
    epriority: "",
    estatus: "todo",
    edueDate:""
  });
const [projectMembers,setProjectMembers] = useState([]);
 useEffect(() => {
   if (currentTask) {
  setTask({
      id:currentTask._id,
      etitle:currentTask.title,
      edescription:currentTask.description,
      eassignedTo:currentTask.assignedTo,
      epriority:currentTask.priority,
      estatus:currentTask.status,
     edueDate: currentTask.dueDate ? currentTask.dueDate.split("T")[0] : ""
 })};
}, [currentTask]);
const selectedProject = currentTask ? projects.find(
  (project) => project._id === currentTask.project
):null;
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
}, [currentTask, projects]);
  const updateTask = (e) => {
    e.preventDefault();
    const {id,etitle,edescription,eassignedTo,epriority,estatus,edueDate} = task;
    editTask(id,etitle,edescription,eassignedTo,epriority,estatus,edueDate);
     Alerts("updated successfully","success");
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
          <h2 className="text-xl font-bold text-gray-800">Edit your Task</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        {/* form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            id="etitle"
            name="etitle"
            value={task.etitle}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            onChange={onChange}  minLength={5} required
          />

          <textarea placeholder="Task description" id="edescription" name="edescription"
            value={task.edescription} rows="3"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            onChange={onChange}  minLength={5} required/>
  
          <select className="w-full rounded-lg border border-gray-300 px-4 py-2"
            id="eassignedTo" name="eassignedTo"  value={task.eassignedTo} onChange={onChange}>
            <option value="">Assign To</option>
             {projectMembers.map((member)=> {return (
                <option key={member._id} value={member._id}>{member.name}
              </option>
            )})}
          </select>

          <div className="grid grid-cols-2 gap-4">
            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              id="epriority"
              name="epriority"
              value={task.epriority}
              onChange={onChange}
            >
              <option value="">Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              id="estatus"
              name="estatus"
              value={task.estatus}
              onChange={onChange}
            >
              <option value="">Status</option>
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <input type="date" id="edueDate" name="edueDate" value={task.edueDate}
            onChange={onChange} className="w-full rounded-lg border border-gray-300 px-4 py-2"
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose}
            className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer">
            Close
          </button>

          <button  disabled={task.etitle.length<5 ||task.edescription.length<5 } className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={updateTask}>Update Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
