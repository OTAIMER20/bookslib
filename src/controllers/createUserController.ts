/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { CreateUserService } from '../services/createUserService'
import { UserRepository } from '../repo/userRepository'

export class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
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
      return next(error)
    }
  }
}
