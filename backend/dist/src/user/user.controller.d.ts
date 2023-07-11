import { CreateUserModel, GetUserModel, LoginUserModel, UpdateUserModel } from 'user/user.dto';
import { UserService } from 'user/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(body: CreateUserModel): Promise<string>;
    loginUser(body: LoginUserModel): Promise<string>;
    getUser(ctx: any): Promise<GetUserModel>;
    updateUser(body: UpdateUserModel, ctx: any): Promise<string>;
    deleteUser(ctx: any): Promise<string>;
}
