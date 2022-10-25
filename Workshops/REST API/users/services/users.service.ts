import UsersDao from '../daos/users.dao';

import { CRUD } from '../../common/interfaces/crud.interface';

import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { IUser } from '../interfaces/user.interface';
import { JwtUserDto } from '../dto/jwt.user.dto';

class UsersService implements CRUD<IUser> {
    public async list(limit: number, page: number): Promise<IUser[]> {
        return UsersDao.getUsers(limit, page);
    };

    public async create(resource: CreateUserDto): Promise<string> {
        return (await UsersDao.addUser(resource))._id.toString();
    };

    public async putById(id: string, resource: PutUserDto): Promise<IUser | null> {
        return UsersDao.updateUserById(id, resource);
    };

    public async readById(id: string): Promise<IUser | null> {
        return UsersDao.getUserById(id);
    };

    public async deleteById(id: string): Promise<boolean> {
        return (await UsersDao.removeUserById(id)).acknowledged;
    };

    public async patchById(id: string, resource: PatchUserDto): Promise<IUser | null> {
        return UsersDao.updateUserById(id, resource);
    };

    public async getUserByEmail(email: string): Promise<IUser | null> {
        return UsersDao.getUserByEmail(email);
    };

    public async getUserByEmailWithPassword(email: string): Promise<JwtUserDto | null> {
        const user = await UsersDao.getUserByEmailWithPassword(email);

        if(!user){
            return null;
        }

        return {
            _id: user._id.toString(),
            email: user.email,
            password: user.password,
            permissionFlags: user.permissionFlags
        };
    };
}

export default new UsersService();