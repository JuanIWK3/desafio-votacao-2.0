import { PautaRepository } from "../repository/PautaRepository";

export class VotePauta {
  constructor(private pautaRepository: PautaRepository) {}

  async execute(input: Input) {
    return await this.pautaRepository.vote(
      input.pautaId,
      input.vote,
      input.userId
    );
  }
}

type Input = {
  pautaId: string;
  vote: boolean;
  userId: string;
};
