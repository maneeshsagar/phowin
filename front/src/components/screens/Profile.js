
import React, { useContext } from "react"
import { useEffect,useState } from "react"
import { UserContext } from "../../App"


const Profile=()=>{
    const {state,dispatch}=useContext(UserContext)
    const [data,setData]=useState([])
    useEffect(()=>{
        dispatch({type:"USER",payload:data.user})
        fetch('/myposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")

            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log(result)
            setData(result.myposts)
        })

    },[])
    return(
        <div style={{maxWidth:"850px",margin:"0px auto"}}>

            <div style={{display:"flex",justifyContent:"space-around",
            margin:"18px 40px",
            borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    alt="Photo"
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
            
                <div>

                        <h4>{ JSON.parse(localStorage.getItem('user')).name}</h4>
                        <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                            <h6> 40 posts</h6>
                            <h6> 100 Followers</h6>
                            <h6> 100 Following</h6>
                        </div>
                </div>

            </div>

            <div className="gallery">
                
               {
                   data.map(item=>{
                        return(

                            <img className="item"src={item.photo}/>
                        )
                   })
               }

            </div>
        </div>
    )
}
export default Profile