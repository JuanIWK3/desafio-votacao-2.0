import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.user.deleteMany({});
});

test("should create a user", async () => {
  console.log(await prisma.user.findMany());

  const inputSignup: Prisma.UserCreateInput = {
    name: "John Doe",
    email: `john.doe${Math.random()}@email.com`,
    cpf: "97456321558",
    password: "12345678",
  };

  const user = await prisma.user.create({
    data: inputSignup,
  });

  expect(user.email).toBe(inputSignup.email);
});
