import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    person: {
      secretCode: true,
    },
    user: {
      password: true,
    },
  },
});

export default prisma;
