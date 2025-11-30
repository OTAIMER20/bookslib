import { Response, NextFunction } from 'express'
import { CreateBookService } from '../services/createBookService'
import { AuthenticatedRequest } from '../middlewares/ensureAuthenticated'

export class CreateBookController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private createBookService: CreateBookService) {}

  async handle(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const { title, genre, resume, author, ageRating, publishedDate } =
        req.body

      const publisherId = req.user.userId

      const { book } = await this.createBookService.execute({
        title,
        genre,
        resume,
        author,
        ageRating,
        publisherDate: new Date(publishedDate),
        publisherId,
      })

      return res.status(201).json(book)
    } catch (error) {
      next(error)
    }
  }
}
