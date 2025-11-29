/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import {
  verifyToken,
  generateAccessToken,
  generateRefreshToken,
} from '../utils/jwt'

export async function refreshController(req: Request, res: Response) {
  try {
    const token = req.cookies?.refreshToken

    if (!token) {
      return res.status(401).json({ message: 'Refresh token missing' })
    }

    const decoded: any = verifyToken(token)

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
