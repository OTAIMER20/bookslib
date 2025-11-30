import { Router, RequestHandler } from 'express'
import { createUserSchema } from './validators/createUser.schema'
import { CreateUserController } from './controllers/createUserController'
import { validate } from './middlewares/validate'
import { authRoute } from './middlewares/ensureAuthenticated'

import { loginController } from './controllers/loginController'
import { refreshController } from './controllers/refreshController'

const router = Router()
const protectedRouter = Router()
protectedRouter.use(authRoute as RequestHandler)

router.post('/users', validate(createUserSchema), (req, res, next) =>
  new CreateUserController().handle(req, res, next),
)

router.post('/login', loginController)

router.post('/refresh', refreshController)

protectedRouter.post('/books', (req, res) => {
  res.status(201).json({ message: 'Book created successfully' })
})

router.use('/', protectedRouter)

export default router
