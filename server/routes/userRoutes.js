const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User= require('../models/userSchema');

//req=> request coming from the FE
//res=> response given back to the FE

router.post('/register', async (req, res) =>{
    try{
        const ifUserExists = await User.findOne({email:req.body.email});
        if(ifUserExists){
            return res.send({
                success:false,
                message: "User already exists"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const newUser = await User(req.body);
        await newUser.save();
        res.send({
            success:true,
            message:"User successfully created",
            data: newUser
        })

    }catch(error){
        console.log(error)
    }
})

router.post('/login', async (req, res)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
       return res.status(401).send({
        success: false,
        message: 'User does not exist'
       }) 
    }
    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword){
        return res.send({
            success: false,
            message: 'Invalid password'
        })
    }
    const token = jwt.sign({
        userId : user.id,
        userName : user.userName,
        email : user.email,
        role :user.role
    }, 'idigital-bookshow', {expiresIn: '10d'})
    res.status(200).send({
        success:true,
        message:"user logged in!",
        token:token
    })
})

router.get("/all-users", async(req,res)=>{
    try{
       const users = await User.find().select('-password');
       res.send({
        success:true,
        message:'Users fetched!', 
        data:users
       }) 
    }catch(error){
        console.log(error);
    }
})

module.exports = router;