import { db } from '../database'
import { Book } from '../models/book'

const TABLE_NAME = 'books'

export class BookRepository {
  async findByTitle(title: string): Promise<Book | undefined> {
    // eslint-disable-next-line prettier/prettier
    const [books] = await db<Book>(TABLE_NAME).where('title', 'ilike', `%${title}%`)

    return books
  }

  async create(bookData: Omit<Book, 'id'>): Promise<Book> {
    const [book] = await db<Book>(TABLE_NAME).insert(bookData).returning('*')

    const newBook = await this.findById(book!.id)

    if (!newBook) {
      throw new Error('Book creation failed')
    }

    return newBook
  }

  async findByGenre(genre: string): Promise<Book[]> {
    // eslint-disable-next-line prettier/prettier
    return db<Book>(TABLE_NAME).where({ genre })
  }

  async findByAuthor(author: string): Promise<Book[]> {
    // eslint-disable-next-line prettier/prettier
    return db<Book>(TABLE_NAME).where('author', 'ilike', `%${author}%`)
  }

  async findByAgeRating(ageRating: number): Promise<Book[]> {
    return db<Book>(TABLE_NAME).where('ageRating', '<=', ageRating)
  }

  async deleteById(bookId: string, publisherId: string): Promise<number> {
    // eslint-disable-next-line prettier/prettier
    const deletedCount = await db<Book>(TABLE_NAME).where({ id: bookId, publisherId }).del()

    return deletedCount
  }

  async findById(bookId: string): Promise<Book | undefined> {
    const book = await db<Book>(TABLE_NAME).where({ id: bookId }).first()

    return book
  }
}
