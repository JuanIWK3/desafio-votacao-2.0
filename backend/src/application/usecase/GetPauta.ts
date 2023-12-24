import { PautaRepository } from "../repository/PautaRepository";

export class GetPauta {
    constructor(private readonly pautaRepository: PautaRepository) {}

    async execute(id: string) {
        return await this.pautaRepository.getById(id);
    }
}