export interface Book {
  id: string
  title: string
  genre: string
  ageRating: number
  resume: string
  author: string
  publishedDate: Date
  publisherId: string
}

export interface CreateBookPayload {
  title: string
  genre: string
  ageRating: number
  resume: string
  author: string
  publishedDate: Date
  publisherId: string
}
