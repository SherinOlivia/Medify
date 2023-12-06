import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import 'dotenv/config'

const insertAdmin = async (req: any, res?: Response) => {
    try {
        const adminCheck = await req.db.collection('users').findOne({ role: 'admin' });

        if (!adminCheck) {
            const adminUsername = process.env.ADMIN_USERNAME;
            const adminEmail = process.env.ADMIN_EMAIL;
            const adminPass = process.env.ADMIN_PASS;
            const hashedPass = await bcrypt.hash(adminPass!, 10);

            await req.db.collection('users').insertOne({
                username: adminUsername,
                email: adminEmail,
                password: hashedPass,
                role: 'admin'
            });

            console.log("Admin Account successfully created! Welcome!");
        } else {
            console.log("Reminder: Admin already exists");
            return;
        }
    } catch (error) {
        console.error("Error!! Can't input Admin data", error);
    }
}

export default insertAdmin;
