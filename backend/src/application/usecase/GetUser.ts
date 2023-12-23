import { UserRepository } from "../repository/UserRepository";

export default class GetUser {

	constructor (private userRepository: UserRepository) {
	}
	
	async execute (userId: string) {
		return await this.userRepository.getById(userId);
	}
}