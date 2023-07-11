import { UserModel } from './models/user';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    postHello(body: UserModel, headers: any): Promise<UserModel>;
}
