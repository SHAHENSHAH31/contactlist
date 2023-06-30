import { Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import Style from './Nav.module.css';
function Nav(){
    return(
      <>
<nav>
        <Link className='link' to='/'>

        <h2  className= {Style.heading}>Contact List App</h2>
    
        </Link>
</nav>

    <Outlet/>

      </>

    );
}

export default Nav;