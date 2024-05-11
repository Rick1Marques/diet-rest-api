import User from "../models/user";
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from "express";

export const postSignup = async (req: Request,res: Response, next: NextFunction) => {
    try {
        const{name, email,password} = req.body
    
        let user = await User.findOne({email: email})
        if(user){
            throw new Error('Email address is already in use!')
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        user = new User({name: name, email: email, password: hashedPassword})
        await user.save()
        res.status(201).json({message: "New user created!", user: user})
    } catch (error) {
        console.log(error)
    }
}