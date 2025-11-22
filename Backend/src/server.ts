import 'dotenv/config';
import express from "express";
import configViewEngine from './config/viewEngine';
import initWebRoutes from './router/initWebRoutes';
import connectDB from './config/connectDB';
import cors from 'cors';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: ['http://localhost:300','https://300-firebase-webapp-1758292440344.cluster-y75up3teuvc62qmnwys4deqv6y.cloudworkstations.dev'] }));

configViewEngine(app);
initWebRoutes(app);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`The server is running at http://localhost:${port}`);
    });
});