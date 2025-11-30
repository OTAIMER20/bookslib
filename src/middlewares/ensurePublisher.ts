import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from './ensureAuthenticated'

export function ensurePublisher(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' })
  }

  if (req.user.role !== 'publisher') {
    return res
      .status(403)
      .json({ message: 'Only publishers can perform this action' })
  }

  next()
}
