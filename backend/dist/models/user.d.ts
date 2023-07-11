export type UserModel = {
    Id: string;
    Firstname: string;
    Lastname: string;
    Email: string;
    Password: string;
    Communities_id: string[];
};
export declare const createUser: (userData: UserModel) => Promise<UserModel | null>;
