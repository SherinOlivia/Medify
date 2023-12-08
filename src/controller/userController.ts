import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import { errorHandling } from './errorHandling';

// User Profile for Admin/Staff Access
const getUserProfileByAdmin = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId);

        if (user) {
            return res.status(200).json(
                errorHandling({
                    message: `${user.username}'s Profile`,
                    data: user
                },
                null)
            );
        } else {
            return res.status(404).json(errorHandling(null, 'User not found.'));
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(errorHandling(null, 'Internal Server Error.'));
    }
};

// User Profile for Regular User Access
const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(403).json(errorHandling(null, 'Access Forbidden.'));
        }

        const user = await UserModel.findById(userId);

        if (user) {
            return res.status(200).json(
                errorHandling({
                    message: `${user.username}'s Profile`,
                    data: user
                },
                null)
            );
        } else {
            return res.status(404).json(errorHandling(null, 'User not found.'));
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(errorHandling(null, 'Internal Server Error.'));
    }
};

// User List
const getUsersList = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();

        return res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json(errorHandling(null, 'Internal Server Error.'));
    }
};

export { getUserProfileByAdmin, getUserProfile, getUsersList };
