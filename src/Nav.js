import React from 'react';
import {Link} from 'react-router-dom';



const Nav=(props)=>{
    
    return(
        <div>
         <Link to='/signup'><button>Sign up</button></Link> 
                 
         {/* how to pass Buyer Signup BUTTON as props to Buyer Signup Component ??? */}
        </div>

    )}

    export default Nav;