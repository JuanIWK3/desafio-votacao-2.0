import { Pauta, PrismaClient } from "@prisma/client";
import { PautaRepository } from "../../application/repository/PautaRepository";

export class PautaRepositoryDatabase implements PautaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(pauta: SavePautaInput): Promise<Pauta> {
    console.log("saving");
    
    return await this.prisma.pauta.create({
      data: {
        title: pauta.title,
        description: pauta.description,
        createdBy: {
          connect: {
            id: pauta.createdById,
          },
        },
      },
    });
  }
}

export type SavePautaInput = Omit<Pauta, "createdAt" | "updatedAt" | "id">;
