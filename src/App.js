import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState} from "react";
import Nav from "./Nav/Nav";
import Home from "./Home/Home";
import AddToContact from "./AddToContact/AddToContact";
import EditContact from "./EditContact/EditContact";
import './App.css';
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  const[contactList,setContactList]=useState([]);
  const fetchContactList=async()=>{
    let data = await fetch('https://jsonplaceholder.typicode.com/users/');
    let contact = await data.json();
    console.log(contact);
    setContactList(contact);
}


useEffect(()=>{
    fetchContactList();
}, []);

  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
         {index: true,  element :<Home contactList={contactList} setContactList={setContactList} /> },
        { path: "AddToContact", element: <AddToContact contactList={contactList} setContactList={setContactList}/> },
        {path : 'edit-contact/:id' , element : <EditContact contactList={contactList} setContactList={setContactList}/>},
      ],
    },
  ]);
  return (
    <>
         <ToastContainer />
        <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
