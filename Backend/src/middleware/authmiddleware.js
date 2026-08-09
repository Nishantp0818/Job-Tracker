const jwt  =require("jsonwebtoken");
const userModel =require("../models/user.model");

const authmiddleware =async(req, res ,next)=>{

    const token =req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "unauthorized"
        })
    }
    let decoded;
    try{
         decoded = jwt.verify(token,  process.env.JWT_SECRET);

    }catch(error) {
        return res.status(401).json({
            message: "invalid Token"
        })
    
}
    
    const user  =await userModel.findById(decoded.id);
    req.user = user;

    
next();
}



module.exports=authmiddleware;