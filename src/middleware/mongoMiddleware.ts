import {Request, Response, NextFunction} from 'express';
import { Db, MongoClient } from 'mongodb';

const uri = 'mongodb+srv://admin:admin@cluster0.kip1euw.mongodb.net/?retryWrites=true&w=majority'

const mongoMiddleware = async (req: any, res: Response, next : NextFunction) => {
    try {
        const mongoClient = await new MongoClient(uri).connect();
        const db: Db = mongoClient.db('Medify');
    
        req.db = db
        if(db){
            console.log("MongoDB Connection Succeed..!");
            next();
        } else {
            console.log("MongoDB Connection Failed...");
        }
        
    } catch (error) {
        console.log("MongoDB Connection Failed..:", error);
    }
  };
  
export default mongoMiddleware;