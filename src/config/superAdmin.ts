import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const insertAdmin = async (req?: Request | undefined) => {
    try {
        if (!req || !req.db) {
            console.error("Error!! Can't input Admin data: Request or db is undefined");
            return;
        }

        const adminCheck = await req.db.collection('users').findOne({ role: 'admin' });

        if (!adminCheck) {
            const adminFirstName = process.env.ADMIN_FIRSTNAME;
            const adminLastName = process.env.ADMIN_LASTNAME;
            const adminUsername = process.env.ADMIN_USERNAME;
            const adminEmail = process.env.ADMIN_EMAIL;
            const adminPass = process.env.ADMIN_PASS;
            const hashedPass = await bcrypt.hash(adminPass!, 10);

            await req.db.collection('users').insertOne({
                first_name: adminFirstName,
                last_name: adminLastName,
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
