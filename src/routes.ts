import { Router } from 'express'
import { createUserSchema } from './validators/createUser.schema'
import { CreateUserController } from './controllers/createUserController'
import { validate } from './middlewares/validate'

const router = Router()

router.post('/users', validate(createUserSchema), (req, res) =>
  new CreateUserController().handle(req, res),
)

export default router
