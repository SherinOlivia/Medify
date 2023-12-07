import { Request, Response, NextFunction } from 'express';
import { Db, MongoClient } from 'mongodb';
import 'dotenv/config';

const uri = process.env.URI!;

const mongoMiddleware = async (req: any, res: Response, next: NextFunction) => {
    let client: MongoClient | null = null;

    try {
        console.log("MongoDB Connection Test..!");
        client = await new MongoClient(uri).connect();
        const db: Db = client.db('chatApp');
        req.db = db;

        if (db) {
            console.log("MongoDB Connection Succeed..!");
            next();
        } else {
            console.log("MongoDB Connection Failed...");
        }

    } catch (error) {
        console.log("MongoDB Connection Failed..:", error);
    } finally {
        res.on('finish', async () => {
            if (client) {
                await client.close();
                console.log("MongoDB Connection Closed..!");
            }
        });
    }
};

export default mongoMiddleware;
