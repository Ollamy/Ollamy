import prisma from "../client";

export const createUser = async (email: string, password: string): Promise<string> => {
    try {
        await prisma.user.create({
            data: {
                password: password,
                email: email,
                firstname: "elyes",
                lastname: "toumi"
        }});
        return email;
    } catch (e) {
        console.log(e);
        return "";
    }
}