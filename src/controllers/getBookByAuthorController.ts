import { Request, Response, NextFunction } from 'express'
import { GetBookByAuthorService } from '../services/getBookByAuthorService'

export class GetBookByAuthorController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly getBookByAuthorService: GetBookByAuthorService,
  ) {}

  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { author } = req.params
      if (!author || typeof author !== 'string') {
        return res.status(400).json({ message: 'Invalid author parameter' })
      }
      const rawAge = req.query.age
      const userAge = rawAge !== undefined ? parseInt(String(rawAge), 10) : 0

      if (isNaN(userAge) || userAge < 0) {
        return res.status(400).json({ message: 'Invalid age parameter' })
      }

      const book = await this.getBookByAuthorService.execute(author, userAge)
      if (!book) {
        return res.status(404).json({ message: 'Book not found' })
      }

      return res.json(book)
    } catch (error) {
      return next(error)
    }
  }
}
