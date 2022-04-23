const jwt =require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const mongoose=require('mongoose')
const User = mongoose.model("User")


module.exports=(req,res,next)=>{
    console.log('Witin Middleware')
    const {authorization} = req.headers
    if(!authorization)
    {
        console.log('In 1st Autho')
        return res.status(401).json({Error:"You must log in Before"})
    }
    const token= authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err)
        {
            console.log('In Verification')
            return res.status(401).json({Error:"You must log in Before"})
        }

        const {_id}=payload
        User.findById(_id)
        .then(userData=>
            {
                req.user=userData
                next()
            })
           
    })
    console.log('End of the Middleware')
}