import { Prisma, PrismaClient } from "@prisma/client";
import { Signup } from "../src/application/usecase/Signup";
import LoggerConsole from "../src/infra/logger/LoggerConsole";
import { UserRepositoryDatabase } from "../src/infra/repository/UserRepositoryDatabase";
import GetUser from "../src/application/usecase/GetUser";

let signup: Signup;
let getUser: GetUser;
let prisma: PrismaClient;

beforeAll(async () => {
  prisma = new PrismaClient();
});

beforeEach(async () => {
  const userDAO = new UserRepositoryDatabase(prisma);
  const logger = new LoggerConsole();
  signup = new Signup(userDAO, logger);
  getUser = new GetUser(userDAO);

  await prisma.$executeRaw`TRUNCATE "User" CASCADE;`;
});

test("should create a user", async () => {
  const inputSignup: Prisma.UserCreateInput = {
    name: "John Doe",
    email: `john.doe${Math.random()}@email.com`,
    cpf: "97456321553",
    password: "12345678",
  };

  const outputSignup = await signup.execute(inputSignup);
  expect(outputSignup.id).toBeDefined();

  const outputGetUser = await getUser.execute(outputSignup.id);
  expect(outputGetUser?.email).toBe(inputSignup.email);
});

test("Should not create a new user with an existing email", async () => {
  const inputSignup = {
    name: "John Doe",
    email: `john.doe${Math.random()}@email.com`,
    cpf: "97456321551",
    password: "12345678",
  };

  await signup.execute(inputSignup);
  await expect(() => signup.execute(inputSignup)).rejects.toThrow(
    new Error("Existing user")
  );
});

test("Should not create a new user with an existing cpf", async () => {
  const inputSignup = {
    name: "John Doe",
    email: `john.doe${Math.random()}@email.com`,
    cpf: "97456321552",
    password: "12345678",
  };

  await signup.execute(inputSignup);
  await expect(() => signup.execute(inputSignup)).rejects.toThrow(
    new Error("Existing user")
  );
});
