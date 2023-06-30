import { useState } from 'react';
import Style from './AddToContact.module.css'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

function AddToContact(props){
    const{contactList,setContactList}=props
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [tel,setTel]=useState('');
    const navigate = useNavigate();


    const addContact = async(e) => {
        e.preventDefault();

        const checkContact = contactList.find(contact => ((contact.phone === (parseInt(tel) && tel))));
        const checkEmail=contactList.find(contact => (contact.email===email));
        if(checkEmail&&checkContact){
            return toast.warning("Plz enter unique email and number!");
        }
        if(checkEmail){
            return toast.warning("Plz enter unique email it is already present in contact!");
        }
        if(checkContact){
           return toast.warning("Plz enter unique number it is already present in contact!");
        }

  const newContact= await fetch('https://jsonplaceholder.typicode.com/users', {
  method: 'POST',
  body: JSON.stringify({
    id: contactList[contactList.length - 1].id + 1,
    name: name,
    email: email,
    phone: tel
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
},
})
   let contact = await newContact.json();
   console.log(contact.id);
   const newContactList=[...contactList];
   newContactList.push({
    id: contactList[contactList.length - 1].id + 1,
    name:name ,
    email:email ,
    phone:tel 
});
   toast.success("New Contact added !");
   setContactList(newContactList);
   navigate('/');
}
    return(
        <>
            <>
            <div className={Style.container}>
                <h1>Add To Contact</h1>
                <form onSubmit={(e)=> addContact(e)}>
                    <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required  /> <br />
                    <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required  /> <br />
                    <input type="tel" placeholder="Number" value={tel} onChange={(e)=>setTel(e.target.value)}  required /> <br />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
        </>
    )
}

export default AddToContact;