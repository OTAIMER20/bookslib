import { BookRepository } from '../repo/bookRepository'

export class UpdateBookService {
  private bookRepository: BookRepository

  constructor() {
    this.bookRepository = new BookRepository()
  }

  async execute(
    bookId: string,
    publisherId: string,
    updateData: Partial<{
      title: string
      author: string
      ageRating: number
      genre: string
      resume: string
      publishedDate: Date
    }>,
  ) {
    return this.bookRepository.updateById(bookId, publisherId, updateData)
  }
}
