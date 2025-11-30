import { BookRepository } from '../repo/bookRepository'

export class GetBookByAuthorService {
  private bookRepository: BookRepository

  constructor() {
    this.bookRepository = new BookRepository()
  }

  async execute(author: string, userAge: number) {
    return this.bookRepository.findByAuthor(author, userAge)
  }
}
