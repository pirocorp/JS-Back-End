import bcrypt from 'bcrypt';

import User, { collation as userCollation } from '../models/User';
import { IJwtUser, IUser } from '../interfaces/IUser';

export async function login(username: string, password: string): Promise<IJwtUser> {
    const user = await getUser(username);

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
    const exists = await getUser(username);

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
};

const getUser = async (username: string) : Promise<IUser | null> => {
    return await User.findOne({ username }).collation(userCollation);
};
