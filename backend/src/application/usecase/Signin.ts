import { UserRepository } from "../repository/UserRepository";

export class Signin {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input) {
    return await this.userRepository.signin(input.email, input.password);
  }
}

type Input = {
  email: string;
  password: string;
};
