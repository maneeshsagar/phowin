const express = require('express')
const mongoose=require('mongoose')
const requireLogin=require('../middleware/signinmiddleware')
const Post=mongoose.model('Post')
const router=express.Router()


router.get('/myposts',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate('postedBy','email name')
    .then(myposts=>{
        res.json({myposts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate('postedBy','email name')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post('/createpost',requireLogin,(req,res)=>{
    console.log('Within Create Post')
    const {title,body,imageUrl}=req.body
    console.log(req.body)
    if(!title || !body || !imageUrl)
    {
        return res.status(422).json({error:"Please Add All fields"})
    }
    req.user.password=undefined
    const post=new Post({

        title,
        body,
        photo:imageUrl,
        postedBy:req.user


    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })


    
})


module.exports=router