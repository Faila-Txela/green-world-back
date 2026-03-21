import { PrismaClient } from "@prisma/client";

declare global {
  var __db__: PrismaClient | undefined;
}

const __db__ = global.__db__ ?? new PrismaClient({
  log: ['error', 'warn', 'query'],
});

if (process.env.NODE_ENV !== 'production') {
  global.__db__ = __db__;
}

export { __db__ as prisma };