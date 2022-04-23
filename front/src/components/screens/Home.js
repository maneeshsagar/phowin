import { useState ,useEffect,useContext} from "react"
import {UserContext} from '../../App'
const Home=()=>{
    const {state,dispatch}=useContext(UserContext)
    const [data,setData]=useState([])
    useEffect(()=>{
        dispatch({type:"USER",payload:data.user})
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")

            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.posts)
        })

    },[])
    return(
        <div className="home">

            {
                data.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                        <h5>{item.postedBy.name}</h5>
                        <div className="card-image">
                            <img
                            src={item.photo}
                            />
                        </div>
                        <div className="card-content">
                        <i className="material-icons">favorite</i>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            <input type="text" placeholder="Comments"/>
                        </div>
        
                    </div>

                    )
                })
            }
            
      

        </div>
    )
}
export default Home