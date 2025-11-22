import 'dotenv/config';
import express from "express";
import configViewEngine from './config/viewEngine';
import initWebRoutes from './router/initWebRoutes';
import connectDB from './config/connectDB';

const app = express();

connectDB();
configViewEngine(app);
initWebRoutes(app);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});