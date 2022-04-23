const express = require('express')
const mongoose=require('mongoose')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const router=express.Router()
const User = mongoose.model('User')
const {JWT_SECRET}=require('../keys')
const requirelogin=require('../middleware/signinmiddleware')

router.get('/protected',requirelogin,(req,res)=>{
    res.json({messages:"Great You have tokens"})
})

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTg4MDY4OTcyZWFlYzg4Y2QyZWZmZTMiLCJpYXQiOjE2MzYzMDY4Njd9.AiabPjEUQGk8Tesfghtm_aybmqnhWDoc9UEauh-Cyak
router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body
    if(!name || !email || !password)
    {
       return res.status(422).json({error:"Add all fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser)
        {
            return res.status(422).json({error:"User Already Registred "})
        }
        bcrypt.hash(password,12)
        .then(hashedPassword=>{
                    const user=new User(
                        {
                            email,
                            password:hashedPassword,
                            name
                        }
                    )
                    user.save()
                    .then((user)=>{
                        return res.json({messages:"Registered Successfully"})
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
        })
       
    })
    .catch((err)=>{
        console.log(err)
    })
    console.log(req.body)
})


router.post('/login',(req,res)=>{

    console.log('In /login post req')
    const {email,password}=req.body
    if(!email || !password)
    {
        return res.status(422).json({error:"You have not entered either Email or Password"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser)
        {
            return res.status(422).json({error:"You have  entered Wrong  Email or Password"})
        }else
        {

            bcrypt.compare(password,savedUser.password)
            .then(onMatch=>{
                if(onMatch)
                {
                    
                   const token= jwt.sign({_id:savedUser._id},JWT_SECRET)
                   const {_id,name,email}=savedUser
                   res.json({token,user:{_id,name,email}})
                   
                }
                else
                {
                    return res.status(422).json({Error:"You have  entered Wrong  Email or Password"})
                }
                 
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports= router