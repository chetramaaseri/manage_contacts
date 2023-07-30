const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const User = require("../models/userModal");

// @desc POST registerUser 
// @route GET /user/register
// @access public
const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const alreadyRegistered = await User.findOne({email});
    if(alreadyRegistered){
        res.status(400);
        throw new Error("Email Already Registered");
    }
    const usernameTaken = await User.findOne({username});
    if(usernameTaken){
        res.status(400);
        throw new Error("username already taken");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
        username,
        email,
        password : hashedPassword
    });
    if(!user){
        res.status(400);
        throw new Error("invalid data");
    }else{
        res.status(201).json({message:"user registered",username});
    }
});

// @desc POST registerUser 
// @route GET /user/register
// @access public
const loginUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if((!username && !password) || ( !email && !password)){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = (username) ? await User.findOne({username}) : await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email: user.email,
                id:user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "50m"
        }
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("invalid credentials");
    }
});

// @desc POST currentUserInformation 
// @route GET /user/current
// @access private
const currentUserInformation = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id);

    if(user){
        res.status(200).json({user});
    }else{
        res.status(401);
        throw new Error("invalid request");
    }
});

module.exports = {registerUser,loginUser,currentUserInformation};