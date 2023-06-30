import { Link } from 'react-router-dom';
import Style from './EditContainer.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState} from "react";
import {toast} from 'react-toastify';

function EditContact(props){
    const navigate=useNavigate();
    const{contactList,setContactList}=props;
    const param=useParams();
    const currentContact = contactList.find(contact => contact.id === parseInt(param.id));
    const [name,setName]=useState(currentContact.name);
    const [email,setEmail]=useState(currentContact.email);
    const [tel,setTel]=useState(currentContact.phone);
   
      
    const handleSubmit=async(e)=>{
        e.preventDefault();

        if (name === currentContact.name && email === currentContact.email && tel === currentContact.phone) {
            return toast.error('Please changes the values !');
        }


     await fetch(`https://jsonplaceholder.typicode.com/users/${currentContact.id}`, {
  method: 'PUT',
  body: JSON.stringify({
    id: currentContact.id,
    name:name,
    email: email,
    phone: tel,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
const updatedContact = {
    ...currentContact,
    name:name,
    email:email,
    phone:tel
};
// Updating the list
const updatedList = contactList.map(contact => {
    if (contact.id === currentContact.id) {
        return updatedContact;
    }
    return contact;
});


setContactList(updatedList);
navigate('/');
toast.success("Contact Updated !");
      
    }

    return(
        <>
         <div className={Style.container}>
        <h1>Edit Contact</h1>
        {/* this is the form in which all the action will be performing */}
       <form onSubmit={(e)=>handleSubmit(e)}>

            <input type="text" defaultValue={currentContact?.name}  onChange={(e)=>setName(e.target.value)} placeholder="Name"  /> <br />
            <input type="email" defaultValue={currentContact?.email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"  /> <br />
            <input type="tel"  defaultValue={currentContact?.phone} onChange={(e)=>setTel(e.target.value)} placeholder="Number"  /> <br />
            <div className={Style.buttonDiv}>
                <button type='submit' className={Style.updateButton}>Update Contact</button>
                <Link to='/'>
                    <button className={Style.cancle}>Cancel</button>
                </Link>
            </div>
        </form>
         </div>
        </>
       
    )
}

export default EditContact;




