import jwt from 'jsonwebtoken';

import { JWT_SECRET } from './keys';




const JWT_KEY : any = JWT_SECRET;

if (!JWT_KEY) {
    throw new Error("FATAL ERROR: JWT_SECRET is not defined in .env file.");
}

interface UserPayload {
    id: string;
    name: string;
    email: string;
}


export function generateToken(user: UserPayload): string {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
    };
 
 
    const token = jwt.sign(payload, JWT_SECRET , {
        expiresIn: '1d',
    });

    return token;
}