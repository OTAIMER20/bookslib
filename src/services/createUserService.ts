import { randomUUID } from 'crypto'
import { User } from '../models/user'
import { UserRepository } from '../repo/userRepository'
import { hashPasswrod } from '../utils/hash'

interface CreateUserServiceRequest {
  name: string
  username: string
  age: number
  role: 'publisher' | 'reader'
  email: string
  password: string
}

interface CreateUserServiceResponse {
  user: Omit<User, 'hashedPassword'>
}

export class CreateUserService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    username,
    email,
    age,
    role,
    password,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const hashedPassword = await hashPasswrod(password)

    const userWithSameEmail = await this.userRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new Error('Email already in used')
    }

    const user = await this.userRepository.create({
      id: randomUUID(),
      name,
      username,
      email,
      age,
      hashedPassword,
      role,
    })

    return {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        age: user.age,
        role: user.role,
      },
    }
  }
}
