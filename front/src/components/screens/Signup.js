import {Link,useNavigate} from 'react-router-dom'
import React,{useState} from "react"
import M from "materialize-css"

const Signup=()=>{
        const navigate=useNavigate()
        const [name,setName]=useState("")
        const [password,setPassword]=useState("")
        const [email,setEmail]=useState("")
       
        const PostData=()=>{
            if(!name || !email || !password)
            {
                M.toast({html: "All Fields must be filled",classes:"rounded #d32f2f red darken-2"})
                return
            }
            if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
            {
                M.toast({html: "Please provide valid email",classes:"rounded #d32f2f red darken-2"})
                return
            }
            fetch("/signup",{
             method:"post",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 name,
                 password,
                 email
             })

            }).then(res=>res.json())
            .then(data=>{
               console.log(data)
               if(data.error){
                M.toast({html: data.error,classes:"rounded #d32f2f red darken-2"})
            }else{
                M.toast({html: data.messages,classes:"rounded #388e3c green darken-2"})
                navigate('/login')

            }
               
            }).catch(err=>{
                console.log(err)
            })
        }

    return(
        <div className="myCard">
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input 
                type="text"
                placeholder="Name"
                value={name}
                onChange={
                    (e)=>setName(e.target.value)
                }

                />
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
                onChange={
                    (e)=>setPassword(e.target.value)
                }
                />
                <button className="btn waves-effect waves-light"
                onClick={()=>PostData()}
                >Sign Up
                </button>
                <h5>
                    <Link to="/login">Already have an account</Link>
                </h5>
            </div>
        </div>
    )
}
export default Signup