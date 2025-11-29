/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'
import { UserRepository } from '../repo/userRepository'
import { LoginService } from '../services/loginService'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt'

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  let email: string
  let password: string

  try {
    const parsed = loginSchema.parse(req.body)
    email = parsed.email
    password = parsed.password
  } catch (err: any) {
    return next(
      new AppError('Credenciais inválidas', 401, 'INVALID_CREDENTIALS'),
    )
  }

  try {
    const userRepository = new UserRepository()
    const loginService = new LoginService(userRepository)

    const { user } = await loginService.execute({ email, password })

    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
    })

    const refreshToken = generateRefreshToken({
      userId: user.id,
      role: user.role,
    })

    return res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      })
      .status(200)
      .json({ token: accessToken })
  } catch (err: any) {
    return next(err)
  }
}
