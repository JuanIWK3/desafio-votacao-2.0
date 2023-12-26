import { Prisma, PrismaClient } from "@prisma/client";
import { Signup } from "../src/application/usecase/Signup";
import { UserRepositoryDatabase } from "../src/infra/repository/UserRepositoryDatabase";
import GetUser from "../src/application/usecase/GetUser";
import GetUsers from "../src/application/usecase/GetUsers";

let signup: Signup;
let getUser: GetUser;
let getAll: GetUsers;

let prisma: PrismaClient;

beforeAll(async () => {
  prisma = new PrismaClient();
});

beforeEach(async () => {
  const userDAO = new UserRepositoryDatabase(prisma);
  signup = new Signup(userDAO);
  getUser = new GetUser(userDAO);
  getAll = new GetUsers(userDAO);

  await prisma.$executeRaw`TRUNCATE "User" CASCADE;`;
});

test("should create a user", async () => {
  const inputSignup: Prisma.UserCreateInput = {
    name: "John Doe",
    cpf: "97456321553",
    password: "12345678",
  };

  const outputSignup = await signup.execute(inputSignup);
  expect(outputSignup.id).toBeDefined();

  const outputGetUser = await getUser.execute(outputSignup.id);
  expect(outputGetUser?.cpf).toBe(inputSignup.cpf);

  const outputGetUserByCpf = await getUser.executeByCpf(inputSignup.cpf);
  expect(outputGetUserByCpf?.cpf).toBe(inputSignup.cpf);
});

test("Should not create a new user with an existing cpf", async () => {
  const inputSignup = {
    name: "John Doe",
    cpf: "97456321552",
    password: "12345678",
  };

  await signup.execute(inputSignup);

  await expect(() => signup.execute(inputSignup)).rejects.toThrow(
    new Error("Existing user")
  );

  const getAllOutput = await getAll.execute();
  expect(getAllOutput.length).toBe(1);
});

afterAll(async () => {
  await prisma.user.deleteMany({});
});
