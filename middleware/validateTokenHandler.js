const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req,res,next)=>{
    let token;
    const bearerToken = req.headers.authorization || req.headers.Authorization;
    if(bearerToken && bearerToken.startsWith("Bearer")){
        token = bearerToken.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not Authorized");
            }
            req.user = decoded.user;
            next();
        })
    }
})

module.exports = validateToken;