import { PrismaClient } from "@prisma/client";
import { CreatePauta } from "../src/application/usecase/CreatePauta";
import { GetPauta } from "../src/application/usecase/GetPauta";
import { Signup } from "../src/application/usecase/Signup";
import LoggerConsole from "../src/infra/logger/LoggerConsole";
import { PautaRepositoryDatabase } from "../src/infra/repository/PautaRepositoryDatabase";
import { UserRepositoryDatabase } from "../src/infra/repository/UserRepositoryDatabase";
import { VotePauta } from "../src/application/usecase/VotePauta";

let signup: Signup;
let createPauta: CreatePauta;
let getPauta: GetPauta;
let votePauta: VotePauta;
let logger: LoggerConsole;
let prisma: PrismaClient;

beforeAll(async () => {
  prisma = new PrismaClient();
});

beforeEach(async () => {
  const userDAO = new UserRepositoryDatabase(prisma);
  const pautaDAO = new PautaRepositoryDatabase(prisma);

  logger = new LoggerConsole();
  signup = new Signup(userDAO, logger);
  createPauta = new CreatePauta(pautaDAO);
  getPauta = new GetPauta(pautaDAO);
  votePauta = new VotePauta(pautaDAO);

  await prisma.pauta.deleteMany();
  await prisma.vote.deleteMany();
  await prisma.user.deleteMany();
});

test("Should vote a Pauta", async () => {
  const user = await signup.execute({
    name: "John Doe",
    email: `john.doe${Math.random()}@email.com`,
    cpf: "97456321551",
    password: "12345678",
  });

  const pauta = await createPauta.execute({
    title: "Pauta 1",
    description: "Description 1",
    createdById: user.id,
  });

  logger.log(`${pauta.id}, ${user.id}`);

  await votePauta.execute({
    pautaId: pauta.id,
    userId: user.id,
    vote: true,
  });

  const pautaVoted = await getPauta.execute(pauta.id);

  expect(pautaVoted?.votes.length).toBe(1);
}, 10000);
