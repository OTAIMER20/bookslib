import { BookRepository } from '../repo/bookRepository'

export class DeleteBookService {
  private bookRepository: BookRepository

  constructor() {
    this.bookRepository = new BookRepository()
  }

  async execute(bookId: string, publisherId: string) {
    return this.bookRepository.deleteById(bookId, publisherId)
  }
}
