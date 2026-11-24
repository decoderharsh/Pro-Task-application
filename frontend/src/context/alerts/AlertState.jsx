import { useState } from 'react';
import AlertContext from './AlertContext';

const AlertState = (props)=>{
 const [alert,setAlert] = useState({message:"",type:""})
 const [showAlert,setShowAlert] = useState(false);

const Alerts = (message,type)=>{
         setAlert({
            message:message,
            type:type
         });
         setShowAlert(true);
         setTimeout(() => {
            setShowAlert(false);
         }, 3000);
}


 return (
    <AlertContext.Provider value={{alert,showAlert,Alerts}}>
      {props.children}
    </AlertContext.Provider>
  );
 }
export default AlertState;