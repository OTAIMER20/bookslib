import { UserRepository } from '../repo/userRepository'

export class UpdateRoleService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute(userId: string, role: 'publisher' | 'reader') {
    const user = await this.userRepository.updateRole(userId, role)

    return user
  }
}
