import { Prisma } from "@prisma/client";
import { Logger } from "../logger/Logger";
import { UserRepository } from "../repository/UserRepository";

export class Signup {
  constructor(
    private accountRepository: UserRepository,
    private logger: Logger
  ) {}

  async execute(input: Input): Promise<Output> {
    this.logger.log(`Signup: ${input.name}`);

    const existingAccount = await this.accountRepository.getByEmail(
      input.email
    );

    if (existingAccount) {
      throw new Error("Existing account");
    }

    const account = await this.accountRepository.save(input);

    return {
      id: account.id,
    };
  }
}

export type Input = Prisma.UserCreateInput

export type Output = {
  id: string;
};
