import { comparePassword } from '../utils/hash'
import { UserRepository } from '../repo/userRepository'
import { User } from '../models/user'
import { AppError } from '../errors/AppError'

interface LoginServiceRequest {
  email: string
  password: string
}

interface LoginServiceResponse {
  user: User
}

export class LoginService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: LoginServiceRequest): Promise<LoginServiceResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid Credencials', 401, 'INVALID_CREDENTIALS')
    }

    const isValidPassword = await comparePassword(password, user.hashedPassword)

    if (!isValidPassword) {
      throw new AppError('Invalid Credencials', 401, 'INVALID_CREDENTIALS')
    }

    return {
      user,
    }
  }
}
