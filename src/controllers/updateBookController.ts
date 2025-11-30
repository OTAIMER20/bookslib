import { Response, NextFunction } from 'express'
import { UpdateBookService } from '../services/updateBookService'
import { AuthenticatedRequest } from '../middlewares/ensureAuthenticated'

export class UpdateBookController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly updateBookService: UpdateBookService) {}

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

      const { title, author, ageRating, genre, resume, publishedDate } =
        req.body

      const updateData: {
        title?: string
        author?: string
        ageRating?: number
        genre?: string
        resume?: string
        publishedDate?: Date
      } = {}

      if (title !== undefined) updateData.title = title
      if (author !== undefined) updateData.author = author
      if (ageRating !== undefined) updateData.ageRating = Number(ageRating)
      if (genre !== undefined) updateData.genre = genre
      if (resume !== undefined) updateData.resume = resume
      if (publishedDate !== undefined)
        updateData.publishedDate = new Date(publishedDate)

      const updated = await this.updateBookService.execute(
        id,
        publisherId,
        updateData,
      )

      if (!updated) {
        return res.status(404).json({ message: 'Book not found' })
      }

      return res.json(updated)
    } catch (error) {
      return next(error)
    }
  }
}
