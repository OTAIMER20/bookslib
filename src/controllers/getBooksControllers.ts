/* eslint-disable no-useless-constructor */
import { Request, Response, NextFunction } from 'express'
import {
  GetBooksService,
  GetBookByNameService,
} from '../services/getBooksService'

export class GetBooksController {
  constructor(private readonly getBooksService: GetBooksService) {}

  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const rawAge = req.query.age
      const userAge = rawAge !== undefined ? parseInt(String(rawAge), 10) : 0

      if (isNaN(userAge) || userAge < 0) {
        return res.status(400).json({ message: 'Invalid age parameter' })
      }

      const books = await this.getBooksService.execute(userAge)
      return res.json(books)
    } catch (error) {
      return next(error)
    }
  }
}

export class GetBookByNameController {
  constructor(private readonly getBookByNameService: GetBookByNameService) {}

  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { title } = req.params
      if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: 'Invalid title parameter' })
      }
      const rawAge = req.query.age
      const userAge = rawAge !== undefined ? parseInt(String(rawAge), 10) : 0

      if (isNaN(userAge) || userAge < 0) {
        return res.status(400).json({ message: 'Invalid age parameter' })
      }

      const book = await this.getBookByNameService.execute(title, userAge)

      if (!book) {
        return res.status(404).json({ message: 'Book not found' })
      }

      return res.json(book)
    } catch (error) {
      return next(error)
    }
  }
}
