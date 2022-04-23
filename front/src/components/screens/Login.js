import React,{useState,useContext} from "react"
import { Link, useNavigate } from "react-router-dom"
import M from "materialize-css"
import {UserContext} from '../../App'


const Login=()=>{

    const {state,dispatch}=useContext(UserContext)
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const PostData=()=>{

        if( !email || !password)
        {
            M.toast({html: "All Fields must be filled",classes:"rounded #d32f2f red darken-2"})
            return
        }
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            M.toast({html: "Please provide valid email",classes:"rounded #d32f2f red darken-2"})
            return
        }
        fetch('/login',{

            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.Error)
            {
                M.toast({html: data.Error,classes:"rounded #d32f2f red darken-2"})
            }else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                console.log(state)
                M.toast({html: "Logged In successfully",classes:"rounded #388e3c green darken-2"})
                navigate('/')
            }
            console.log(data)
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
      
  
        <div className="myCard">
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input 
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={
                    (e)=>setEmail(e.target.value)
                }
                />
                <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light"
                onClick={()=>PostData()}
                >login
                </button>
                <h5>
                    <Link to="/signup">If you have not an account</Link>
                </h5>
            </div>
        </div>
        
    )
}
export default Login