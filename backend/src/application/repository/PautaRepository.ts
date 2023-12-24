import { Pauta, Prisma } from "@prisma/client";
import { SavePautaInput } from "../../infra/repository/PautaRepositoryDatabase";

export interface PautaRepository {
  save(pauta: SavePautaInput): Promise<Pauta>;
  getById(id: string): Promise<
    | (Pauta & {
        votes: {
          vote: boolean;
          userId: string;
        }[];
      })
    | null
  >;
  getAll(): Promise<Pauta[]>;
  vote(id: string, vote: boolean, userId: string): Promise<void>;
}
