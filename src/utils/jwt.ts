import jwt from 'jsonwebtoken'
import { env } from '../config/env'

interface AccessTokenPayload {
  userId: string
  role: 'publisher' | 'reader'
}

interface RefreshTokenPayload {
  userId: string
  role: 'publisher' | 'reader'
}

export function generateAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

export function generateRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET)
}
