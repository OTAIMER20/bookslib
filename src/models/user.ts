export interface User {
  id: string
  name: string
  username: string
  email: string
  hashedPassword: string
  age: number
  role: 'publisher' | 'reader'
}

export interface CreateUserPayload {
  name: string
  username: string
  email: string
  password: string
  age: number
  role?: 'publisher' | 'reader'
}

export interface LoginPayload {
  email: string
  password: string
}
