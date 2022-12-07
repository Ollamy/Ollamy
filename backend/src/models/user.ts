import prisma from "../client";

export type UserModel = {
    Id: string;
    Firstname: string;
    Lastname: string;
    Email: string;
    Password: string;
    Communities_id: string[];
};


export const createUser = async (userData: UserModel): Promise<UserModel | null> => {
    try {
        await prisma.user.create({
            data: {
                password: userData.Password,
                email: userData.Email,
                firstname: userData.Firstname,
                lastname: userData.Lastname,
                communities_id: []
        }});
        return userData;
    } catch (e) {
        console.log(e);
        return null;
    }
};