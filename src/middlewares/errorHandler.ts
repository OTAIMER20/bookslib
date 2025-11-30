/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../errors/AppError'

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, code: err.code })
  }

  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      path: issue.path,
      message: issue.message,
    }))
    return res.status(400).json({ message: 'Validation error', errors })
  }

  // eslint-disable-next-line no-console
  console.error(err)

  return res.status(500).json({ message: 'Internal server error' })
}
