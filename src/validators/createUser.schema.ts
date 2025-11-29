import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  username: z.string().min(3).lowercase(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6),
  age: z.coerce.number().positive().int(),
  role: z.enum(['publisher', 'reader']),
})
