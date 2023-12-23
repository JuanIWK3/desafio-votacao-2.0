import { Prisma } from "@prisma/client";
import { Logger } from "../logger/Logger";
import { UserRepository } from "../repository/UserRepository";

export class Signup {
  constructor(
    private userRepository: UserRepository,
    private logger: Logger
  ) {}

  async execute(input: Input): Promise<Output> {
    this.logger.log(`Signup: ${input.name}`);

    const existingUser = await this.userRepository.getByEmail(
      input.email
    );

    if (existingUser) {
      throw new Error("Existing user");
    }

    const user = await this.userRepository.save(input);

    return {
      id: user.id,
    };
  }
}

export type Input = Prisma.UserCreateInput

export type Output = {
  id: string;
};
