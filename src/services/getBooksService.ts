import { BookRepository } from '../repo/bookRepository'

export class GetBooksService {
  private bookRepository: BookRepository

  constructor() {
    this.bookRepository = new BookRepository()
  }

  async execute(userAge: number) {
    return this.bookRepository.getAllBooks(userAge)
  }
}

export class GetBookByNameService {
  private bookRepository: BookRepository

  constructor() {
    this.bookRepository = new BookRepository()
  }

  async execute(title: string, userAge: number) {
    return this.bookRepository.findByTitle(title, userAge)
  }
}
