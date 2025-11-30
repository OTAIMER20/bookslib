import { db } from '../database'
import { User } from '../models/user'
import { AppError } from '../errors/AppError'

const TABLE_NAME = 'users'

export class UserRepository {
  async findById(id: string): Promise<User | undefined> {
    const user = await db<User>(TABLE_NAME).where({ id }).first()

    return user
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await db<User>(TABLE_NAME).where({ email }).first()

    return user
  }

  async create(userData: User): Promise<User> {
    const existingUser = await this.findByEmail(userData.email)

    if (existingUser) {
      throw new AppError('User already exists', 409, 'USER_ALREADY_EXISTS')
    }

    const [user] = await db<User>(TABLE_NAME).insert(userData).returning('*')

    const newUser = await this.findById(user!.id)

    if (!newUser) {
      throw new AppError('User creation failed', 500, 'USER_CREATION_FAILED')
    }

    return newUser
  }

  async updateRole(
    userId: string,
    role: 'publisher' | 'reader',
  ): Promise<User | undefined> {
    await db<User>(TABLE_NAME).where({ id: userId }).update({ role })

    return this.findById(userId)
  }
}
