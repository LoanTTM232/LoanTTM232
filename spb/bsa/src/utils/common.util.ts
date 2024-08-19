import { NextFunction, Request, RequestHandler, Response } from 'express'

/**
 * Pick specified keys from object
 * @param obj
 * @param keys
 * @returns
 */
export const pick = (obj: object, keys: string[]) => {
  return keys.reduce<{ [key: string]: unknown }>((finalObj, key) => {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key as keyof typeof obj]
    }
    return finalObj
  }, {})
}

/**
 * Custom params dictionary
 */
export interface CustomParamsDictionary {
  [key: string]: any
}

/**
 * Bind async function to catch error
 * @param fn
 * @returns
 */
export const catchAsync =
  (
    fn: RequestHandler<
      CustomParamsDictionary,
      any,
      any,
      qs.ParsedQs,
      Record<string, any>
    >
  ) =>
  (
    req: Request<CustomParamsDictionary, any, any, any, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
  }

/**
 * Exclude specified keys from object
 * @param obj
 * @param keys
 * @returns
 */
export const exclude = <Type, Key extends keyof Type>(
  obj: Type,
  keys: Key[]
): Omit<Type, Key> => {
  for (const key of keys) {
    delete obj[key]
  }
  return obj
}
