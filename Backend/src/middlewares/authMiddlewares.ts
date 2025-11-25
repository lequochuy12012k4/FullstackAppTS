import jwt from 'jsonwebtoken'
import Users from '../models/Users'

const ProtectRouter = (req:any,res:any,next:any) =>{
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({message:'Unauthorized'});
        }
        jwt.verify(token, process.env.ACCESS_TOKEN as string, async (error:any, decodedUser:any)=>{
            if(error){
                console.log(error)
                return res.status(403).json({message:'Forbidden'});
            }
            const user = await Users.findById(decodedUser.userId).select('-password');
            if(!user){
                return res.status(404).json({message:"User not found"})
            }
            req.user = user;
            next();
        })
    } catch (error) {
        console.error("Error ProtectRouter:",error);
        return res.status(500).json("Internal server error")
    }
}

export default ProtectRouter;