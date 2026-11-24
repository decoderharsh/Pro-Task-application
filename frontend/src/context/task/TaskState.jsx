import TaskContext from "./TaskContext";
import { useState } from "react";
const projectState = (props) => {
  const host = "http://localhost:3000";
  const tasksInitial = [];

  const [tasks, setTasks] = useState(tasksInitial);
  //fetch all Tasks
  const getAllTasks = async () => {
    //API call
    try{
    const response = await fetch(`${host}/api/task/fetchalltasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken:
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    if (response.ok) {
      setTasks(json);
    } else {
      console.log("Error fetching tasks:", json.error);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
  };
  //create task
  const createTask = async (
    title,
    description,
    project,
    assignedTo,
    priority,
    status,
    dueDate,
  ) => {
    //API call
    const response = await fetch(`${host}/api/task/createtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title,
        description,
        project,
        assignedTo,
        priority,
        status,
        dueDate,
      }),
    });

    const json = await response.json();
    setTasks((prevTasks) => prevTasks.concat(json));
  };
  //Delete Task
  const deleteTask = async (id) => {
    //API call
    const response = await fetch(`${host}/api/task/deletetask/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken:
          localStorage.getItem('token'),
      },
      body: JSON.stringify(),
    });

    const json = await response.json();
    const newTask = tasks.filter((task) => {
     return task._id !== id;
    });
    setTasks(newTask);
  };
   //Edit a Task
  const editTask = async (id, title, description,  assignedTo, priority, status,dueDate) => {
    //API call
    const response = await fetch(`${host}/api/task/updatetask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken:
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description,  assignedTo, priority, status, dueDate }),
    });
    const json = await response.json();
    console.log(json);
    let newTask = JSON.parse(JSON.stringify(tasks));
    for (let i = 0; i < newTask.length; i++) {
      const element = newTask[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.assignedTo = assignedTo;
        element.priority = priority;
        element.status = status;
        element.dueDate = dueDate;
        break;
      }
    }
    setTasks(newTask);
  };
  return (
    <TaskContext.Provider
      value={{ tasks, getAllTasks, createTask, deleteTask, editTask }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
export default projectState;
