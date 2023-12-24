export class GetPautas {
  constructor(private readonly pautaRepository: any) {}

  async execute() {
    return await this.pautaRepository.getAll();
  }
}
