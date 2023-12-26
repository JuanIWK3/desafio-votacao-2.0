import { Prisma, PrismaClient, User } from "@prisma/client";
import { UserRepository } from "../../application/repository/UserRepository";

export class UserRepositoryDatabase implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data: user });
  }

  async getAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async signin(cpf: string, password: string): Promise<any> {
    return await this.prisma.user.findFirst({
      where: {
        cpf,
        password,
      },
    });
  }

  async getById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByCpf(cpf: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });
  }
}
