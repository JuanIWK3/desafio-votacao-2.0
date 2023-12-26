import { UserRepository } from "../repository/UserRepository";

export default class GetUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    return await this.userRepository.getAll();
  }
}
