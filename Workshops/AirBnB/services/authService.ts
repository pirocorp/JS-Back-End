import bcrypt from 'bcrypt';
import { Types } from 'mongoose';

import User from '../models/User';
import { IJwtUser } from '../interfaces/IUser';

export async function login(username: string, password: string): Promise<IJwtUser> {
    const regexExp = new RegExp(username);
    const user = await User.findOne({ username: { $regex: regexExp, $options: 'i' }});

    if(!user){
        throw new Error("Invalid username or password"); 
    }

    const valid = await bcrypt.compare(password, user.hashedPassword);

    if(!valid) {
        throw new Error("Invalid username or password"); 
    }

    const userDto = {
        _id: user._id,
        username: user.username,
        roles: user.roles
    };

    return userDto;
};

export async function register(username: string, password: string): Promise<IJwtUser> {
    const regexExp = new RegExp(username);
    const exists = await User
        .findOne({ username: { $regex: regexExp, $options: 'i' }});

    if(exists) {
        throw new Error("Username is taken");        
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        hashedPassword,
    });

    const userDto = {
        _id: user._id,
        username: user.username,
        roles: user.roles
    };

    return userDto;
}
