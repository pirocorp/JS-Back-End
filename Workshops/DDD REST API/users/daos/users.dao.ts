import shortid from 'shortid';
import debug from 'debug';

import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    private users: Array<CreateUserDto> = [];

    public constructor() {
        log('Created new instance of UsersDao');
    };

    public async addUser(user: CreateUserDto) {
        user.id = shortid.generate();
        this.users.push(user);

        return user.id;
    };

    public async getUsers() {
        return this.users;
    };

    public async getUserById(userId: string) {
        return this.users.find((user: { id: string }) => user.id === userId);
    };

    public async getUserByEmail(email: string) {
        const objIndex = this.users.findIndex(
            (obj: { email: string }) => obj.email === email
        );

        const currentUser = this.users[objIndex];

        if (currentUser) {
            return currentUser;
        } else {
            return null;
        }
    };

    public async putUserById(userId: string, user: PutUserDto) {
        const objIndex = this.users.findIndex(
            (obj: { id: string }) => obj.id === userId
        );

        this.users.splice(objIndex, 1, user);
        return `${user.id} updated via put`;
    };

    public async patchUserById(userId: string, user: PatchUserDto) {
        const objIndex = this.users.findIndex(
            (obj: { id: string }) => obj.id === userId
        );

        const currentUser = this.users[objIndex];

        const allowedPatchFields = [
            'password',
            'firstName',
            'lastName',
            'permissionLevel',
        ];

        for (let field of allowedPatchFields) {
            if (field in user) {
                // @ts-ignore
                currentUser[field] = user[field];
            }
        }

        this.users.splice(objIndex, 1, currentUser);
        return `${user.id} patched`;
    };

    public async removeUserById(userId: string) {
        const objIndex = this.users.findIndex(
            (obj: { id: string }) => obj.id === userId
        );

        this.users.splice(objIndex, 1);
        return `${userId} removed`;
    };
};

// Using the singleton pattern, this class will always provide the same instance—and, 
// critically, the same users array—when we import it in other files.
// That’s because Node.js caches this file wherever it’s imported, and all the imports happen on startup.
export default new UsersDao();