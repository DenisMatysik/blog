import express from "express";
import config  from "config";
import mongoose from "mongoose"
import { registerValidation, loginValidation, postCreateValidation } from "./validation.js";
import checkAuth from "./utils/checkAuth.js";
import {register, login, getMe} from "./controllers/UserController.js";
import { create, getAll, getOne, remove, update } from "./controllers/PostController.js";
import multer from "multer";
import handleValidationErrors from "./utils/handleValidationErrors.js";

const app = express();
const PORT = config.get("port");
const storage = multer.diskStorage({
    destination:(_, __, cb ) =>{
        cb(null, "uploads")
    },
    filename: (_, file, cb)=>{
        cb(null, file.originalname);
    },
});

const upload = multer({storage})

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.listen(PORT, (err)=>{
    if (err){
        return console.log("server err", err)
    }
    console.log("server ok")
})

app.post("/auth/register", registerValidation, handleValidationErrors, register);
app.post("/auth/login" , loginValidation, handleValidationErrors,login);
app.get("/auth/me", checkAuth, getMe);

app.post("/upload" , upload.single("image"), (req, res)=>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});

app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, create);
app.get("/posts", getAll);
app.get("/posts/:id",getOne);
app.delete("/posts/:id", remove);
app.patch("/posts/:id", update);

mongoose.connect(config.get("mongoUrl"))
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log("Server eror", err ));