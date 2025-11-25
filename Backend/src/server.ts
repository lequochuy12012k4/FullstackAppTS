import 'dotenv/config';
import express from "express";
import cors from 'cors';
import connectUsersDB from './config/connectUsers.database';
import authRouter from './router/authRouter';
import cookieParser from "cookie-parser";
import ProtectRouter from './middlewares/authMiddlewares';
import userRouter from './router/userRouter';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/auth',authRouter);
app.use(ProtectRouter);
app.use('/api/users',userRouter);

connectUsersDB().then(() => {
    app.listen(port, () => {
        console.log(`The server is running at http://localhost:${port}`);
    });
});