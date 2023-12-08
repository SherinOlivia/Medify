import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import JWT_TOKEN from '../config/jwtconfig';
import UserModel from '../models/userModel';
import { errorHandling } from './errorHandling';
import NodeCache from 'node-cache';

const failedLoginAttemptsCache = new NodeCache({ stdTTL: 600 });

const loginUser = async (req: Request, res: Response) => {
    try {
        const { usernameOrEmail, password } = req.body;
        let existingUser;

        if (usernameOrEmail.includes('@')) {
            existingUser = await UserModel.findOne({ email: usernameOrEmail });
        } else {
            existingUser = await UserModel.findOne({ username: usernameOrEmail });
        }

        const failedAttempts = failedLoginAttemptsCache.get<number>(usernameOrEmail);

        console.log(existingUser);

        if (failedAttempts !== undefined && failedAttempts >= 5) {
            return res.status(400).json(errorHandling('Too many failed login attempts', null));
        }

        if (existingUser) {
            const passwordCheck = await bcrypt.compare(password, existingUser.password);

            if (passwordCheck) {
                let refreshToken = req.cookies.refresh_token;

                if (!refreshToken) {
                    refreshToken = jwt.sign({ username: existingUser.username, id: existingUser._id, role: existingUser.role }, JWT_TOKEN as Secret, { expiresIn: '7d' });
                }

                const accessToken = jwt.sign({ username: existingUser.username, id: existingUser._id, role: existingUser.role }, JWT_TOKEN as Secret, { expiresIn: '24h' });

                // Reset limit login
                failedLoginAttemptsCache.del(usernameOrEmail);

                // Expiration time for tokens
                const accessTokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
                const refreshTokenExpiration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

                // Cookies
                res.cookie('access_token', accessToken, {
                    expires: accessTokenExpiration,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                });

                res.cookie('refresh_token', refreshToken, {
                    expires: refreshTokenExpiration,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                });

                return res.status(200).json(
                    errorHandling({
                        message: `${existingUser.username} Successfully logged in as ${existingUser.role}`,
                        data: accessToken,
                        accessTokenExpiration,
                        refreshToken,
                        refreshTokenExpiration,
                    },
                    null)
                );
            } else {
                const newFailedAttempts = (failedAttempts || 0) + 1;
                failedLoginAttemptsCache.set(usernameOrEmail, newFailedAttempts);
                return res.status(400).json(errorHandling(null, 'Password is incorrect'));
            }
        } else {
            return res.status(400).json(errorHandling(null, 'User not found. Please check your credentials.'));
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(errorHandling(null, 'Cannot Connect!! Internal Error!'));
    }
};

const logoutUser = async (req: Request, res: Response) => {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res.status(200).json(errorHandling("See you next time!", null));
};

export { loginUser, logoutUser };