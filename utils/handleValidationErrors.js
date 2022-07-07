import { validationResult } from "express-validator";

export default (req, res, next)=>{
    const erors = validationResult(req);
    if (!erors.isEmpty()){
        return res.status(400).json(erors.array())
    }
    next();
}