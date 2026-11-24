import ProjectContext from "./ProjectContext.js";
import { useState } from "react";
const projectState = (props) => {
  const host = "http://localhost:3000";
  const projectsInitial = [];
  const [projects, setProjects] = useState(projectsInitial);
  const [users, setUsers] = useState([]);
  //fetch all users
  const getAllUsers = async () => {
  const response = await fetch(`${host}/api/auth/getallusers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authToken: localStorage.getItem('token'),
    },
  });

  const json = await response.json();

  if (response.ok) {
    setUsers(json);
  }
};
  //fetch all Projects
  const getAllProjects = async () => {
    //API call
    const response = await fetch(`${host}/api/project/fetchallprojects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken:
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    if (response.ok) {
       setProjects(json);
     } else {
     console.log("Project API Error:", json);
    }
  };
  //Add a Project
  const addProject = async (title, description,members, status) => {
    //API call
    const response = await fetch(`${host}/api/project/addproject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken:
          localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        members:members,
        status: status,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json);
      return;
    }

    setProjects((prevProjects) => prevProjects.concat(json));
  };
  //Delete a Project
  const deleteProject = async (id) => {
    //API call
    const response = await fetch(`${host}/api/project/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem('token'),
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    console.log(response.status);
    console.log(json);
    const newProjects = projects.filter((project) => {
      return project._id !== id;
    });
    setProjects(newProjects);
  };
  //Edit a Project
  const editProject = async (id, title, description, status) => {
    //API call
    const response = await fetch(`${host}/api/project/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken:
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, status }),
    });
    const json = await response.json();
    console.log(json);
    let newProject = JSON.parse(JSON.stringify(projects));
    for (let i = 0; i < newProject.length; i++) {
      const element = newProject[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.status = status;
        break;
      }
    }
    setProjects(newProject);
  };
  //get project members
const getMembers = async (members) => {
    //API call
    const response = await fetch(`${host}/api/auth/getprojectmembers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.getItem('token'),
      },
      body: JSON.stringify({members})
    });

   const json = await response.json();
   return json;
    
};
  return (
    <ProjectContext.Provider
      value={{
        projects,
        users,
        getAllUsers,
        setProjects,
        addProject,
        deleteProject,
        editProject,
        getAllProjects,
        getMembers
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};
export default projectState;
