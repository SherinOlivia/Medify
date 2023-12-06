import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'
import { Collection } from 'mongodb'
import { error } from "console";
import { errorHandling } from "./errorHandling";

const registerUser = async (req:any, res:Response, next:NextFunction) => {
    try {
        const { username, email, password, } = req.body;
        const collection: Collection = req.db.collection("users");

        const user = await collection.findOne({ username })

        if (user){
            res.status(400).json(errorHandling(null, "Username already exists...!!"));
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = await collection.insertOne({ username, email, password: passwordHash, role:'patient' })
        const newUserData = await collection.findOne({ _id: newUser.insertedId })

        res.status(200).json({
          message: 'User successfully registered',
          data: newUser.insertedId,  
        }) 
        console.log("new user:", newUser, newUser.insertedId)
        console.log("new Userr:", newUserData)

    } catch (error) {
        res.status(500).json({ error: 'Invalid Register Request..!!'})
    }
    next(error)
}

export { registerUser }