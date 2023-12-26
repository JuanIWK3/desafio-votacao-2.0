import { Pauta, PrismaClient } from "@prisma/client";
import { PautaRepository } from "../../application/repository/PautaRepository";

export class PautaRepositoryDatabase implements PautaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(pauta: SavePautaInput): Promise<Pauta> {
    return await this.prisma.pauta.create({
      data: {
        title: pauta.title,
        createdBy: {
          connect: {
            id: pauta.createdById,
          },
        },
      },
    });
  }

  async getById(id: string) {
    return await this.prisma.pauta.findUnique({
      where: {
        id,
      },
      include: {
        votes: true,
      },
    });
  }

  async getAll(): Promise<Pauta[]> {
    return await this.prisma.pauta.findMany({
      include: {
        votes: true,
      },
    });
  }

  async vote(pautaId: string, vote: boolean, userId: string): Promise<void> {
    await this.prisma.vote.create({
      data: {
        pautaId: pautaId,
        vote,
        userId,
      },
    });
  }
}

export type SavePautaInput = Omit<Pauta, "createdAt" | "updatedAt" | "id">;
