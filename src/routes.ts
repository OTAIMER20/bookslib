import { Router, RequestHandler } from 'express'
import {
  authRoute,
  AuthenticatedRequest,
} from './middlewares/ensureAuthenticated'
import { validate } from './middlewares/validate'
import { createUserSchema } from './validators/createUser.schema'
import { CreateUserController } from './controllers/createUserController'
import { loginController } from './controllers/loginController'
import { refreshController } from './controllers/refreshController'
import { ensurePublisher } from './middlewares/ensurePublisher'
import { createBookControllerFactory } from './factories/createBookControllerFactory'
import {
  GetBooksController,
  GetBookByNameController,
} from './controllers/getBooksControllers'
import { GetBookByAuthorController } from './controllers/getBookByAuthorController'
import { UpdateBookController } from './controllers/updateBookController'
import { DeleteBookController } from './controllers/deleteBookController'
import { UpdateRoleController } from './controllers/updateRoleController'
import {
  GetBooksService,
  GetBookByNameService,
} from './services/getBooksService'
import { GetBookByAuthorService } from './services/getBookByAuthorService'
import { UpdateBookService } from './services/updateBookService'
import { DeleteBookService } from './services/deleteBookService'
import { UpdateRoleService } from './services/updateRoleService'

const router = Router()

// Public routes - no authentication required
router.post('/users', validate(createUserSchema), (req, res, next) =>
  new CreateUserController().handle(req, res, next),
)

router.post('/login', loginController)

router.post('/refresh', refreshController)

// Books routes - require authentication
router.get('/books', authRoute as RequestHandler, (req, res, next) =>
  new GetBooksController(new GetBooksService()).handle(req, res, next),
)

router.get(
  '/books/search/name/:title',
  authRoute as RequestHandler,
  (req, res, next) =>
    new GetBookByNameController(new GetBookByNameService()).handle(
      req,
      res,
      next,
    ),
)

router.get(
  '/books/search/author/:author',
  authRoute as RequestHandler,
  (req, res, next) =>
    new GetBookByAuthorController(new GetBookByAuthorService()).handle(
      req,
      res,
      next,
    ),
)

router.post(
  '/books',
  authRoute as RequestHandler,
  ensurePublisher as RequestHandler,
  createBookControllerFactory(),
)

router.put(
  '/books/:id',
  authRoute as RequestHandler,
  ensurePublisher as RequestHandler,
  (req, res, next) =>
    new UpdateBookController(new UpdateBookService()).handle(
      req as AuthenticatedRequest,
      res,
      next,
    ),
)

router.delete(
  '/books/:id',
  authRoute as RequestHandler,
  ensurePublisher as RequestHandler,
  (req, res, next) =>
    new DeleteBookController(new DeleteBookService()).handle(
      req as AuthenticatedRequest,
      res,
      next,
    ),
)

router.patch(
  '/users/:userId/role',
  authRoute as RequestHandler,
  (req, res, next) =>
    new UpdateRoleController(new UpdateRoleService()).handle(
      req as AuthenticatedRequest,
      res,
      next,
    ),
)

export default router
