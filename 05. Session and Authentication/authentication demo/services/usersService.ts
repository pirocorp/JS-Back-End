import bcrypt from 'bcrypt';

export const users: IUser[] = [];

export async function register(username: string, password: string) {
    if(users.some(u => u.username.toLowerCase() == username.toLowerCase())) {
        throw new Error("Username is taken.");
    }

    const user = {
        username: username,
        hashedPassword: await bcrypt.hash(password, 10)
    };

    users.push(user);
};

export async function login(username: string, password: string) {
    const user = users.find(u => u.username == username);

    if(!user || (!await bcrypt.compare(password, user.hashedPassword))){
        throw new Error("Invalid Credentials");        
    }
};

export interface IUser {
    username: string;
    hashedPassword: string;
}