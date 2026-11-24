import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectState from "./context/project/ProjectState.jsx";
import TaskState from "./context/task/TaskState.jsx";
import Alert from "./components/Alert.jsx";
import Projects from "./components/Projects.jsx";
import Tasks from "./components/Tasks.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import AlertState from "./context/alerts/AlertState.jsx";
function App() {
  return (
    <>
    <ProjectState>
     <TaskState>
      <AlertState>
     <BrowserRouter>
      <Navbar />
      <Alert/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
           <Route path ="/projects" element={<Projects/>}/>
            <Route path ="/tasks" element={<Tasks/>}/>
            <Route path ="/login" element={<Login/>}/>
             <Route path ="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
      </AlertState>
      </TaskState>
      </ProjectState>
    </>
  );
}

export default App;
