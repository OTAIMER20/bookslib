import { Response, NextFunction } from 'express'
import { DeleteBookService } from '../services/deleteBookService'
import { AuthenticatedRequest } from '../middlewares/ensureAuthenticated'

export class DeleteBookController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly deleteBookService: DeleteBookService) {}

  async handle(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.params
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid id parameter' })
      }
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: 'User not authenticated' })
      }
      const publisherId = req.user.userId
      await this.deleteBookService.execute(id, publisherId)
      return res.status(204).send()
    } catch (error) {
      return next(error)
    }
  }
}
