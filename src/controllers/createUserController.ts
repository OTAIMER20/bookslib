/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { CreateUserService } from '../services/createUserService'
import { UserRepository } from '../repo/userRepository'

export class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { name, username, email, password, age, role } = req.body

      const userRepository = new UserRepository()
      const createService = new CreateUserService(userRepository)

      const newUser = await createService.execute({
        name,
        username,
        email,
        password,
        age,
        role,
      })

      return res.status(201).json(newUser)
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
}
