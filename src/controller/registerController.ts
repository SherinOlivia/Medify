import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'
import { Collection } from 'mongodb'
import { error } from "console";
import { errorHandling } from "./errorHandling";

const registerUser = async (req: Request, res:Response, next:NextFunction) => {
    try {
        const { first_name, last_name, username, email, password } = req.body;
        const collection: Collection = req.db.collection("users");

        const user = await collection.findOne({ username })

        if (user){
            res.status(400).json(errorHandling(null, "Username already exists...!!"));
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = await collection.insertOne({ first_name, last_name, username, email, password: passwordHash, role:'patient' })
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

const registerUserByAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { first_name, last_name, username, email, password, role } = req.body;
        const rolesEnum = ['staff', 'patient'];
        const collection: Collection = req.db.collection("users");

        if (!rolesEnum.includes(role)) {
            return res.status(400).json(errorHandling(null, `Invalid role. Allowed roles are: ${rolesEnum.join(', ')}`));
        }

        const user = await collection.findOne({ username });

        if (user) {
            res.status(400).json(errorHandling(null, "Username already exists...!!"));
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await collection.insertOne({ first_name, last_name, username, email, password: passwordHash, role });
        const newUserData = await collection.findOne({ _id: newUser.insertedId });

        res.status(200).json({
            message: 'User successfully registered by admin',
            data: newUser.insertedId,
        });
        console.log("new user:", newUser, newUser.insertedId);
        console.log("new Userr:", newUserData);

    } catch (error) {
        res.status(500).json({ error: 'Invalid Register Request..!!' });
        next(error);
    }
};

const registerMedicalPersonnel = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { first_name, last_name, username, email, password, specialization, hospital, role } = req.body;
        const rolesEnum = ['medical_admin', 'doctor'];
        const collection: Collection = req.db.collection("medicalPersonnels");

        if (!rolesEnum.includes(role)) {
            return res.status(400).json(errorHandling(null, `Invalid role. Allowed roles are: ${rolesEnum.join(', ')}`));
        }

        const medicalPersonnel = await collection.findOne({ username });

        if (medicalPersonnel) {
            res.status(400).json(errorHandling(null, "Medical personnel with this username already exists...!!"));
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newMedicalPersonnel = await collection.insertOne({ first_name, last_name, username, email, password: passwordHash, specialization, hospital, role });
        const newMedicalPersonnelData = await collection.findOne({ _id: newMedicalPersonnel.insertedId });

        res.status(200).json({
            message: 'Medical personnel successfully registered',
            data: newMedicalPersonnel.insertedId,
        });
        console.log("new medical personnel:", newMedicalPersonnel, newMedicalPersonnel.insertedId);
        console.log("new Medical Personnel:", newMedicalPersonnelData);

    } catch (error) {
        res.status(500).json({ error: 'Invalid Register Request..!!' });
        next(error);
    }
};

const registerMedicalFacility = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, location, email, contact } = req.body;
        const collection: Collection = req.db.collection("medicalFacilities");

        const existingFacility = await collection.findOne({ name });

        if (existingFacility) {
            return res.status(400).json(errorHandling(null, `Medical facility with the name ${name} already exists...!!`));
        }

        const newFacility = await collection.insertOne({name, location, email, contact});
        const newFacilityData = await collection.findOne({ _id: newFacility.insertedId });
        res.status(200).json({
            message: 'Medical facility successfully registered',
            data: newFacility.insertedId,
        });

        console.log("new medical facility:", newFacility, newFacility.insertedId);
        console.log("new medical facility:", newFacilityData);

    } catch (error) {
        res.status(500).json({ error: 'Invalid Register Request..!!' });
        next(error);
    }
};


export { registerUser, registerUserByAdmin, registerMedicalPersonnel, registerMedicalFacility }