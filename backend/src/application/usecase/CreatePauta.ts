import { Pauta, Prisma, PrismaClient } from "@prisma/client";
import { SavePautaInput } from "../../infra/repository/PautaRepositoryDatabase";
import { PautaRepository } from "../repository/PautaRepository";

export class CreatePauta {
  constructor(private readonly pautaRepository: PautaRepository) {
    this.pautaRepository = pautaRepository;
  }

  async execute(input: Input): Promise<Output> {
    return await this.pautaRepository.save(input);
  }
}

type Input = SavePautaInput;

type Output = Pauta;
