import { BookRepository } from '../repo/bookRepository'
import { CreateBookService } from '../services/createBookService'
import { CreateBookController } from '../controllers/createBookController'
import { RequestHandler } from 'express'

export const createBookControllerFactory = (): RequestHandler => {
  const bookRepository = new BookRepository()

  const createBookService = new CreateBookService(bookRepository)

  const controller = new CreateBookController(createBookService)

  return controller.handle.bind(controller) as RequestHandler
}
