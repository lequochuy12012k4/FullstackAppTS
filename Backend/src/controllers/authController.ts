import Users from "../models/Users";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import Sessions from "../models/Sessions";

export const Register = async (req:any, res:any) =>{
    try {
        const {username,password,email, firstName, lastName} = req.body;
        if(!username||!password||!email||!firstName||!lastName){
            return res.status(400).json({message:'All fields are required'});
        }
        const checkUsernameExist = await Users.findOne({username});
        const checkEmailExist = await Users.findOne({email});
        if(checkUsernameExist){
            return res.status(409).json({message:'Username already exist'});
        }
        if(checkEmailExist){
            return res.status(409).json({message:'Email already exist'});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await Users.create({
            username,
            password:hashedPassword,
            email,
            displayName:`${firstName} ${lastName}`
        });
        return res.status(204).json({message:'User created successfully',user});
    }catch(error){
        console.error("Error register:",error);
        return res.status(500).json("Internal server error")
    }
}

export const Login = async (req:any, res:any) =>{
    try {
        const {username, password} = req.body;
        if(!username||!password){
            return res.status(400).json({message:'All fields are required'});
        }
        const user = await Users.findOne({username});
        if(!user){
            return res.status(404).json({message:'Username or Password not found'});
        }
        const passwordCorrect = await bcrypt.compare(password,user.password);
        if(!passwordCorrect){
            return res.status(404).json({message:'Username or Password not found'});
        };
        const accessToken = jwt.sign({userId:user._id},process.env.ACCESS_TOKEN as string,{expiresIn:'15m'});
        const refreshToken = crypto.randomBytes(64).toString('hex');

        const sessionTimeExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        const session = await Sessions.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(sessionTimeExpires)
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({message:`User ${user.displayName} login successfully`,accessToken});

    } catch (error) {
        console.error("Error Login:",error);
        return res.status(500).json("Internal server error")
    }
}

export const Logout = async (req:any, res:any)=>{
    try {
        const token = req.cookies?.refreshToken;
        if(token){
            await Sessions.deleteOne({refreshToken: token});
            res.clearCookie("refreshToken");
        }
        return res.sendStatus(204);
    } catch (error) {
        console.error("Error Logout:",error);
        return res.status(500).json("Internal server error")
    }
}
