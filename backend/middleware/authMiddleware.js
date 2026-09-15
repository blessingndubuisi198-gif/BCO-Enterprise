const jwt = require("jsonwebtoken");
const protect = async (req, res, next) =>{
    let token;

    console.log("HEADERS:",req.headers);
    console.log("AUTH:", req.headers.authorization);

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            console.log("DECODED:", decoded);

            req.user = decoded;
            next();
        } catch(error){
            return res.status(401).json({
                message:"Not authorized, token failed",
            });
        }
    }
    if(!token){
        return res.status(401).json({
            message:"Not authorized,no token",
        });
    }
    };

    module.exports = {
        protect,
    };