import { Prisma, PrismaClient } from "@prisma/client";
import { CreatePauta } from "../src/application/usecase/CreatePauta";
import { GetPauta } from "../src/application/usecase/GetPauta";
import { Signup } from "../src/application/usecase/Signup";
import { PautaRepositoryDatabase } from "../src/infra/repository/PautaRepositoryDatabase";
import { UserRepositoryDatabase } from "../src/infra/repository/UserRepositoryDatabase";
import { GetPautas } from "../src/application/usecase/GetPautas";

let signup: Signup;
let createPauta: CreatePauta;
let getPautas: GetPautas;
let prisma: PrismaClient;

beforeAll(async () => {
  prisma = new PrismaClient();
});

beforeEach(async () => {
  const userDAO = new UserRepositoryDatabase(prisma);
  const pautaDAO = new PautaRepositoryDatabase(prisma);
  signup = new Signup(userDAO);
  createPauta = new CreatePauta(pautaDAO);
  getPautas = new GetPautas(pautaDAO);

  await prisma.pauta.deleteMany();
  await prisma.user.deleteMany();
});

test("Should create a Pauta", async () => {
  const inputSignup: Prisma.UserCreateInput = {
    name: "John Doe",
    cpf: "17456321554",
    password: "12345678",
  };

  const outputSignup = await signup.execute(inputSignup);
  expect(outputSignup.id).toBeDefined();

  const createPautaOutput = await createPauta.execute({
    title: "Pauta 1",
    createdById: outputSignup.id,
  });

  expect(createPautaOutput.id).toBeDefined();

  const getPautasOutput = await getPautas.execute();

  expect(getPautasOutput.length).toBe(1);
});
