import { UserRepository } from "../repository/UserRepository";

export default class GetUser {

	constructor (private userRepository: UserRepository) {
	}
	
	async execute (accountId: string) {
		const user = await this.userRepository.getById(accountId);
		return user;
	}
}