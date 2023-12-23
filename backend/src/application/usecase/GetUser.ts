import { UserRepository } from "../repository/UserRepository";

export default class GetUser {

	constructor (private userRepository: UserRepository) {
	}
	
	async execute (userId: string) {
		const user = await this.userRepository.getById(userId);
		return user;
	}
}