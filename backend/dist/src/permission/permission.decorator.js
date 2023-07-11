"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowUser = exports.PermissionType = exports.Method = exports.PERMISSION_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PERMISSION_KEY = 'PERMISSION';
var Method;
(function (Method) {
    Method["ALL"] = "ALL";
    Method["ONE_OF"] = "ONE_OF";
})(Method = exports.Method || (exports.Method = {}));
var PermissionType;
(function (PermissionType) {
    PermissionType["USER"] = "USER";
    PermissionType["ROLE"] = "ROLE";
    PermissionType["COURSE"] = "COURSE";
    PermissionType["SECTION"] = "SECTION";
    PermissionType["CHAPTER"] = "CHAPTER";
    PermissionType["LESSON"] = "LESSON";
})(PermissionType = exports.PermissionType || (exports.PermissionType = {}));
const AllowUser = (type, method, ...args) => (0, common_1.SetMetadata)(exports.PERMISSION_KEY, { type, method, args });
exports.AllowUser = AllowUser;
//# sourceMappingURL=permission.decorator.js.map