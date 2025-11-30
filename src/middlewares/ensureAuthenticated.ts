import { Request, Response, NextFunction } from 'express'
import {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
} from '../utils/jwt'

interface RefreshRequest extends Request {
  user?: { userId: string; role: 'publisher' | 'reader' }
}

export async function refreshController(req: RefreshRequest, res: Response) {
  try {
    const token = req.cookies?.refreshToken

    if (!token) {
      return res.status(401).json({ message: 'Refresh token missing' })
    }

    const decoded = verifyToken(token) as {
      userId: string
      role: 'publisher' | 'reader'
    }

    req.user = decoded // adiciona para poder usar noutros middlewares se precisares

    const accessToken = generateAccessToken({
      userId: decoded.userId,
      role: decoded.role,
    })

    const newRefreshToken = generateRefreshToken({
      userId: decoded.userId,
      role: decoded.role,
    })

    return res
      .cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      })
      .status(200)
      .json({ token: accessToken })
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' })
  }
}

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string
    role: 'publisher' | 'reader'
    age: number
    iat: number
    exp: number
  }
}

export async function authRoute(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Token missing' })
  }

  try {
    const decoded = verifyToken(token) as Omit<
      AuthenticatedRequest['user'],
      'age'
    >

    // Buscar a idade do usuário do banco de dados
    const { UserRepository } = await import('../repo/userRepository.js')
    const userRepository = new UserRepository()
    const user = await userRepository.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = {
      ...decoded,
      age: user.age,
    }
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
