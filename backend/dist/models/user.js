"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const client_1 = require("../client");
const createUser = async (userData) => {
    try {
        await client_1.default.user.create({
            data: {
                password: userData.Password,
                email: userData.Email,
                firstname: userData.Firstname,
                lastname: userData.Lastname,
                communities_id: []
            }
        });
        return userData;
    }
    catch (e) {
        console.log(e);
        return null;
    }
};
exports.createUser = createUser;
//# sourceMappingURL=user.js.map