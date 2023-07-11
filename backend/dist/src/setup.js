"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODE = exports.FRONTEND_PORT = exports.FRONTEND_URL = exports.BACKEND_PORT = exports.SECRET_KEY = void 0;
const env_var_1 = require("env-var");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: './.env' });
exports.SECRET_KEY = (0, env_var_1.get)('SECRET_KEY').required().asString();
exports.BACKEND_PORT = (0, env_var_1.get)('BACKEND_PORT')
    .required()
    .asPortNumber();
exports.FRONTEND_URL = (0, env_var_1.get)('FRONTEND_URL').required().asString();
exports.FRONTEND_PORT = (0, env_var_1.get)('FRONTEND_PORT')
    .required()
    .asPortNumber();
exports.MODE = (0, env_var_1.get)('MODE').required().default('dev').asString();
//# sourceMappingURL=setup.js.map