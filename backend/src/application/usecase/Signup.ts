import { Prisma } from "@prisma/client";
import { UserRepository } from "../repository/UserRepository";

export class Signup {
  constructor(private userRepository: UserRepository) {}

  async execute(input: Input) {
    const existingEmail = await this.userRepository.getByEmail(input.email);

    const existingCpf = await this.userRepository.getByCpf(input.cpf);

    if (existingEmail || existingCpf) {
      throw new Error("Existing user");
    }

    const user = await this.userRepository.save(input);

    return user;
  }
}

export type Input = Prisma.UserCreateInput;
