import { Types } from 'mongoose';
import debug from 'debug';

import mongooseService from '../../common/services/mongoose.service';

import { IUser } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    private Schema;
    private userSchema;
    private User;

    public constructor() {
        this.Schema = mongooseService.getMongoose().Schema;

        this.userSchema = new this.Schema({
            email: String,
            password: { type: String, select: false }, // The select: false in the password field will hide this field whenever we get a user or list all users.
            firstName: String,
            lastName: String,
            permissionFlags: Number,
        });

        this.User = mongooseService.getMongoose().model<IUser>('User', this.userSchema);

        log('Created new instance of UsersDao');
    };

    public async addUser(userFields: CreateUserDto): Promise<IUser> {
        const user = new this.User({
            ...userFields,
            permissionFlags: 1, // Note that whatever the API consumer sends in for permissionFlags via userFields, we then override it with the value 1
        });

        await user.save();        
        return user;
    };

    public async getUserByEmail(email: string): Promise<IUser | null> {
        return this.User.findOne({ email: email }).exec();
    };
    
    public async getUserById(userId: string): Promise<IUser | null> {
        return this.User.findOne({ _id: userId }).exec();
    };
    
    public async getUsers(limit = 25, page = 0): Promise<IUser[]> {
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    };

    // Function can update the entire document or just part of it.
    public async updateUserById(
        userId: string,
        userFields: PatchUserDto | PutUserDto
    ): Promise<IUser | null> {
        const existingUser = await this.User
            .findOneAndUpdate(
                { _id: userId },
                { $set: userFields },
                { new: true }
            )
            .exec();
    
        return existingUser;
    };

    public async removeUserById(userId: string) {
        return this.User.deleteOne({ _id: userId }).exec();
    }
};

// Using the singleton pattern, this class will always provide the same instance—and, 
// critically, the same users array—when we import it in other files.
// That’s because Node.js caches this file wherever it’s imported, and all the imports happen on startup.
export default new UsersDao();