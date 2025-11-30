import { Router, RequestHandler } from 'express'
import { authRoute } from './middlewares/ensureAuthenticated'
import { validate } from './middlewares/validate'
import { createUserSchema } from './validators/createUser.schema'
import { CreateUserController } from './controllers/createUserController'
import { loginController } from './controllers/loginController'
import { refreshController } from './controllers/refreshController'
import { ensurePublisher } from './middlewares/ensurePublisher'

import { createBookControllerFactory } from './factories/createBookControllerFactory'

const router = Router()

router.post('/users', validate(createUserSchema), (req, res, next) =>
  new CreateUserController().handle(req, res, next),
)

router.post('/login', loginController)

router.post('/refresh', refreshController)

router.post(
  '/books',
  authRoute as RequestHandler,
  ensurePublisher as RequestHandler,
  createBookControllerFactory(),
)

export default router
