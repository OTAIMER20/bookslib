import { Request, Response, NextFunction, RequestHandler } from 'express'
import { ZodTypeAny, ZodIssue } from 'zod'

export function validate(schema: ZodTypeAny): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body)

    if (!parsed.success) {
      const errors = parsed.error.issues.map((e: ZodIssue) => ({
        path: (e.path || []).join('.') || '',
        message: e.message,
      }))
      return res.status(400).json({ errors })
    }

    req.body = parsed.data
    return next()
  }
}
