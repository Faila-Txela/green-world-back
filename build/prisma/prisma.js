"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const __db__ = global.__db__ ?? new client_1.PrismaClient({
    log: ['error', 'warn', 'query'],
});
exports.prisma = __db__;
if (process.env.NODE_ENV !== 'production') {
    global.__db__ = __db__;
}
