import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { Collection } from 'mongodb';
import jwt, { Secret } from 'jsonwebtoken';
import { errorHandling } from "./errorHandling";

const loginUser = async (req: Request, res: Response) => {
    try {
        const { usernameOrEmail, password } = req.body;
        const collection: Collection = req.db.collection("users");

        let user;

        if (usernameOrEmail.includes('@')) {
            user = await collection.findOne({ email: usernameOrEmail });
        } else {

            user = await collection.findOne({ username: usernameOrEmail });
        }

        if (!user) {
            return res.status(400).json(errorHandling(null, "User not found. Please check your credentials."));
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (passwordCheck) {
            const token = jwt.sign({ username: user.username, id: user._id, role: user.role }, process.env.JWT_TOKEN as Secret);

            res.status(200).json(errorHandling({
                message: `${user.username} Successfully logged in as ${user.role}`,
                data: token
            }, null));
        } else {
            res.status(400).json(errorHandling("Password is incorrect", null));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(errorHandling("Cannot Connect!! Internal Error!", null));
    }
};

export default loginUser;
