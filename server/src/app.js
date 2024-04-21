import "dotenv/config";
import cors from 'cors';
import Express from "express";
import { Dbconnection, } from "./Db/config.js";
import dbInit from "./Db/init.js";
import bodyParser from "body-parser";
import allRouter from "./routers/allrouters/index.js";
const app = Express();
app.use(bodyParser.json())
app.use(Express.json());
app.use(cors({ orgin: "http://localhost/5173" }));
app.use(allRouter);
app.listen("3003", console.log("Server Started"));
Dbconnection;
dbInit();