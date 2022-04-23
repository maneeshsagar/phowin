import { useContext } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {UserContext} from '../App'

const Navbar=()=>{
    const navigate=useNavigate()
    const {state,dispatch}=useContext(UserContext)
    const renderList=()=>{
        console.log(state)
        if(localStorage.getItem("jwt"))
        {
            return[

                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Post</Link></li>,
                <button className="btn waves-effect waves-light"
                onClick={()=>{

                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    navigate('/login')
                }
               
                }
                >Logout
                </button>
            ]
        }else{
            console.log(state)
            return[
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">Sign Up</Link></li>

            ]

        }
    }
    return(

            <nav>
            <div className="nav-wrapper white" >
                <Link to={state?"/":"/login"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                     {renderList()}
              
                </ul>
            </div>
            </nav>
      
    )
}
export default Navbar