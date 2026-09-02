const userModel =require("../models/user.model");
const jwt =require('jsonwebtoken');
const bcrypt = require("bcryptjs");

// API for REGISTER
async function registerUser(req,res){
    try{
    const {Username, email, password}=req.body;

    const isalreadyregister = await userModel.findOne({
        email
    })

    if(isalreadyregister){
        return res.status(409).json({
            message:"User is already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
   
    const user= await userModel.create({
        Username,email,password : hashedPassword
    })
    const token =jwt.sign({
        id:user._id
    }, process.env.JWT_SECRET)

     res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
});
    user.password = undefined;

    res.status(201).json({
        message: "User register successfully",
        user
    });
}catch(error) {
   return res.status(500).json({
      message: "Internal Server Error"
   });
}}

// API for LOGIN 

async  function loginUser(req,res){
    try{
    const {email,password} =req.body

    const user =await userModel.findOne({
        email
    })
    if (!user){
        return res.status(404).json({
            message: "User not Found"
        })
    }

 const ismatch = await bcrypt.compare(password, user.password)
 if(!ismatch){
return res.status(401).json({
    message: "invaild email or password"
})
 }
const token =jwt.sign({
    id: user._id},
    process.env.JWT_SECRET,
)
res.cookie("token", token, { 
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
});
user.password = undefined;

res.status(200).json({
    message: "Login successfully",
    user
});
    }catch(error) {
   return res.status(500).json({
      message: "Internal Server Error"
   });
}}




// API for LOGOUT
async function logoutUser(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        return res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// API for GET CURRENT USER
async function getMe(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const user = req.user.toObject();
        delete user.password;
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { registerUser, loginUser, logoutUser, getMe };

