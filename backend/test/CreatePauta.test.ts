import { Prisma, PrismaClient } from "@prisma/client";
import { CreatePauta } from "../src/application/usecase/CreatePauta";
import GetUser from "../src/application/usecase/GetUser";
import { Signup } from "../src/application/usecase/Signup";
import LoggerConsole from "../src/infra/logger/LoggerConsole";
import { PautaRepositoryDatabase } from "../src/infra/repository/PautaRepositoryDatabase";
import { UserRepositoryDatabase } from "../src/infra/repository/UserRepositoryDatabase";

let signup: Signup;
let createPauta: CreatePauta;

beforeEach(async () => {
  const prisma = new PrismaClient();
  const userDAO = new UserRepositoryDatabase(prisma);
  const pautaDAO = new PautaRepositoryDatabase(prisma);
  const logger = new LoggerConsole();
  signup = new Signup(userDAO, logger);
  createPauta = new CreatePauta(pautaDAO);

  await prisma.pauta.deleteMany();
  await prisma.user.deleteMany();
});

test.only("Should create a Pauta", async () => {
  const inputSignup: Prisma.UserCreateInput = {
    name: "John Doe",
    email: `john.doe${Math.random()}@email.com`,
    cpf: "97456321554",
    password: "12345678",
  };

  const outputSignup = await signup.execute(inputSignup);
  expect(outputSignup.id).toBeDefined();

  const createPautaOutput = await createPauta.execute({
    title: "Pauta 1",
    description: "Description 1",
    createdById: outputSignup.id,
  });

  expect(createPautaOutput.id).toBeDefined();

  console.log(createPautaOutput);
});
