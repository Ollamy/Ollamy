import { CreateUserModel, GetUserModel, LoginUserModel, UpdateUserModel } from './user.dto';
export declare class UserService {
    private createToken;
    private hashPassword;
    private randomIntByString;
    registerUser(userData: CreateUserModel): Promise<string>;
    loginUser(userData: LoginUserModel): Promise<string>;
    getUser(ctx: any): Promise<GetUserModel>;
    updateUser(userData: UpdateUserModel, ctx: any): Promise<string>;
    deleteUser(ctx: any): Promise<string>;
}
