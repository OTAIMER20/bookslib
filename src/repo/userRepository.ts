import { db } from '../database'
import { User } from '../models/user'

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
      throw new Error('User already exist')
    }

    const [user] = await db<User>(TABLE_NAME).insert(userData).returning('*')

    const newUser = await this.findById(user!.id)

    if (!newUser) {
      throw new Error('User creation failed')
    }

    return newUser
  }
}
