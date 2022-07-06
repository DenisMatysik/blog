import express from "express";
import config  from "config";
import mongoose from "mongoose"
import { registerValidation, loginValidation } from "./validation.js";
import checkAuth from "./utils/checkAuth.js";
import {register, login, getMe} from "./controllers/UserController.js";
import { createPost } from "./controllers/PostController.js";

const app = express();
const PORT = config.get("port")

app.use(express.json());


app.listen(PORT, (err)=>{
    if (err){
        return console.log("server err", err)
    }
    console.log("server ok")
})

app.post("/auth/register", registerValidation, register);
app.post("/auth/login", loginValidation, login);
app.get("/auth/me", checkAuth, getMe);

app.post("/posts",createPost);
// app.get("/posts",getAll);
// app.get("/posts/:id",getOne);
// app.delete("/posts",remove);
// app.patch("/posts",update);



mongoose.connect(config.get("mongoUrl"))
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log("Server eror", err ));