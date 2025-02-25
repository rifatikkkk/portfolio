import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    person: {
      secretCode: true,
    },
  },
});

export default prisma;
