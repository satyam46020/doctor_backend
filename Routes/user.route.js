const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const UserModel=require("../Model/User.model")
const AuthRouter=express.Router()

AuthRouter.post("/signup",async (req,res)=>{
    const {name,email,password}=req.body;
    try {
        bcrypt.hash(password, 4, async function(err, hash) {
            await UserModel.create({name,email,password:hash})
            return res.send({msg:"signup successfull"})
        });
    } catch (error) {
        console.log(error)
        return res.send({msg:"something went wrong!"})
        
    }
})

AuthRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email})
    if(!user){
        return res.send({msg:"invalid credentials"})
    }
    const hash_password=user.password
    bcrypt.compare(password, hash_password, function(err, result) {
        if(result){
            const token= jwt.sign({ userId: user._id }, "masai");
            return res.send({msg:"login successfull",token:token})
        }
        else{
            return res.send({msg:"login failed"})
        }
    });
})

module.exports=AuthRouter