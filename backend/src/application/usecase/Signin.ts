import { UserRepository } from "../repository/UserRepository";

export class Signin {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input) {
    return await this.userRepository.signin(input.cpf, input.password);
  }
}

type Input = {
  cpf: string;
  password: string;
};
