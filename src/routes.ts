import { Router } from 'express'
import { createUserSchema } from './validators/createUser.schema'
import { CreateUserController } from './controllers/createUserController'
import { validate } from './middlewares/validate'

import { loginController } from './controllers/loginController'
import { refreshController } from './controllers/refreshController'

const router = Router()

router.post('/users', validate(createUserSchema), (req, res, next) =>
  new CreateUserController().handle(req, res, next),
)

router.post('/login', loginController)

router.post('/refresh', refreshController)

export default router
