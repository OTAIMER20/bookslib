import { randomUUID } from 'crypto'
import { Book } from '../models/book'
import { BookRepository } from '../repo/bookRepository'

interface CreateBookRequest {
  title: string
  genre: string
  resume: string
  author: string
  ageRating: number
  publisherDate: Date
  publisherId: string
}

interface CreateBookResponse {
  book: Book
}

export class CreateBookService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private bookRepository: BookRepository) {}

  async execute({
    title,
    genre,
    resume,
    author,
    ageRating,
    publisherDate,
    publisherId,
  }: CreateBookRequest): Promise<CreateBookResponse> {
    const book = await this.bookRepository.create({
      id: randomUUID(),
      title,
      genre,
      resume,
      author,
      ageRating,
      publishedDate: publisherDate,
      publisherId,
    })

    return {
      book: {
        id: book.id,
        title: book.title,
        genre: book.genre,
        resume: book.resume,
        ageRating: book.ageRating,
        publishedDate: book.publishedDate,
        author: book.author,
        publisherId: book.publisherId,
      },
    }
  }
}
