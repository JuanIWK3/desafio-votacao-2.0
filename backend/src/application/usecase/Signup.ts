import { Prisma } from "@prisma/client";
import { Logger } from "../logger/Logger";
import { UserRepository } from "../repository/UserRepository";

export class Signup {
  constructor(private userRepository: UserRepository, private logger: Logger) {}

  async execute(input: Input) {
    // this.logger.log(`Signup: ${input.name} ${input.email} ${input.cpf}`);

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
