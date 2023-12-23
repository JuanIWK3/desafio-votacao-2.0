import { Pauta, Prisma } from "@prisma/client";
import { SavePautaInput } from "../../infra/repository/PautaRepositoryDatabase";

export interface PautaRepository {
  save(pauta: SavePautaInput): Promise<Pauta>;
}
