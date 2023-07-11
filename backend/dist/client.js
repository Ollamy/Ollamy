"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log(`Database connected`);
}
;
main()
    .catch((e) => {
    throw `Failed to initialize database: ${e}`;
})
    .finally(async () => {
    await prisma.$disconnect();
});
exports.default = prisma;
//# sourceMappingURL=client.js.map