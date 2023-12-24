import { Prisma, PrismaClient } from "@prisma/client";
import { Signup } from "../src/application/usecase/Signup";
import { UserRepositoryDatabase } from "../src/infra/repository/UserRepositoryDatabase";
import { Signin } from "../src/application/usecase/Signin";

let prisma: PrismaClient;
let signup: Signup;
let signin: Signin;

beforeAll(async () => {
  prisma = new PrismaClient();
});

beforeEach(async () => {
  const userDAO = new UserRepositoryDatabase(prisma);
  signup = new Signup(userDAO);
  signin = new Signin(userDAO);

  await prisma.$executeRaw`TRUNCATE "User" CASCADE;`;
});

test("Should sign in a user", () => {
  const inputSignup: Prisma.UserCreateInput = {
    name: "John Doe",
    email: `john.doe${Math.random()}@email.com`,
    cpf: "97456321553",
    password: "12345678",
  };

  signup.execute(inputSignup);

  const inputSignin = {
    email: inputSignup.email,
    password: inputSignup.password,
  };

  const outputSignin = signin.execute(inputSignin);

  expect(outputSignin).toBeDefined();
});
