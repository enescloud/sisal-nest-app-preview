"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
async function hashPassword(password) {
    const salt = await (0, bcryptjs_1.genSalt)();
    const hashedPassword = await (0, bcryptjs_1.hash)(password, salt);
    return hashedPassword;
}
const prisma = new client_1.PrismaClient();
async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'admin@sisal.com',
            password: await hashPassword('iLoveSisal'),
            role: 'admin_superAdmin',
            type: 'admin',
        },
    });
    console.log('User created sucessfully:', user);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map