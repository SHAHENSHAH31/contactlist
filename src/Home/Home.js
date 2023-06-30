import { Link } from "react-router-dom";
import Style from './Home.module.css';
import {toast} from 'react-toastify';

function Home(props){
    
    const deleteContact=async(contact)=>{
        await fetch(`https://jsonplaceholder.typicode.com/users/${contact.id}`, {
          method: 'DELETE',
        });
        let i=props.contactList.indexOf(contact);

       props.setContactList(props.contactList.filter((contact,index)=>index!==i));
       toast.success("Contact Deleted Successfully !");
      }
      
  
    return(
        <>
        <div className={Style.addContact}>
            <Link to='AddToContact'>
              <button>Add To Contact</button>
            </Link>
        </div>

        <div className={Style.contactTable}>
            <table>
                <thead>
                    <tr className={Style.tableHead}>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                       props.contactList.map((contact,index) => (
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>
                                <Link to={`edit-contact/${contact.id}`}>
                                    <button className={Style.editButton}>Edit</button>
                                </Link>
                            </td>
                            <td>
                                <button onClick={()=>deleteContact(contact)} className={Style.deleteButton}>Delete</button>
                            </td>
                          </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
        </>
    );
}

export default Home;