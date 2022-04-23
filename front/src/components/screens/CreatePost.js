import React,{useEffect, useState} from "react";
import M from "materialize-css"
import { Link, useNavigate } from "react-router-dom"


const CreatePost=()=>{
    const navigate=useNavigate()
    const [title,setTitle]=useState("")
    const [body,setbody]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")

    useEffect(()=>{
        if(url)
        {

            fetch('/createpost',{

                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    imageUrl:url
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.Error)
                {
                    M.toast({html: data.Error,classes:"rounded #d32f2f red darken-2"})
                }else{
                    M.toast({html: "Posted Successfully",classes:"rounded #388e3c green darken-2"})
                    navigate('/')
                }
                console.log(data)
            }).catch(err=>{
                console.log(err)
            })


        }

    },[url])

    const postImage=()=> {
        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","man081097")

        fetch("https://api.cloudinary.com/v1_1/man081097/image/upload",{
            method:"post",
            
            body:data,
            
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.url)
            //useEffect(()=>{})
            setUrl(data.url)
            console.log(url)
        })
        .catch(
            err=>{
                console.log(err)
            }
        )

        

        console.log(url)


    }


    return(
        <div className="card input-filed"
        style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}
        >
            <input type="text" placeholder="title"
            
            value={title}
            onChange={
                (e)=>setTitle(e.target.value)
            }
            />
            <input type="text" placeholder="Description"
            value={body}
            onChange={
                (e)=>setbody(e.target.value)
            }
            />
            <div className="file-field input-field">
                    <div className="btn">
                        <span>Image</span>
                        <input type="file" 
                        
                        onChange={
                            (e)=>setImage(e.target.files[0])
                        }
                        
                        multiple/>
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
                    </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postImage()}
            >Post
                </button>

        </div>
        
        )}

export default CreatePost