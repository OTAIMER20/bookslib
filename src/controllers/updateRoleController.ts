import { Response, NextFunction } from 'express'
import { UpdateRoleService } from '../services/updateRoleService'
import { AuthenticatedRequest } from '../middlewares/ensureAuthenticated'

export class UpdateRoleController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly updateRoleService: UpdateRoleService) {}

  async handle(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { userId } = req.params
      const { role } = req.body

      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: 'Invalid userId parameter' })
      }

      if (!role || (role !== 'publisher' && role !== 'reader')) {
        return res
          .status(400)
          .json({ message: 'Invalid role. Must be publisher or reader' })
      }

      const updatedUser = await this.updateRoleService.execute(userId, role)

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' })
      }

      return res.json(updatedUser)
    } catch (error) {
      return next(error)
    }
  }
}
