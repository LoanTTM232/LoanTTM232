import bcrypt from 'bcryptjs'

/**
 * First letter uppercase
 * @param str
 * @returns
 */
export const firstLetterUppercase = (str: string): string => {
  const valueString = str.toLowerCase()
  return valueString
    .split(' ')
    .map(
      (value: string) =>
        `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`
    )
    .join(' ')
}

/**
 * Generate random integers
 * @param integerLength
 * @returns
 */
export const generateRandomIntegers = (integerLength: number): number => {
  const characters = '0123456789'
  let result = ''

  const charactersLength = characters.length
  for (let i = 0; i < integerLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return parseInt(result, 10)
}

/**
 * Check if value is data url
 * @param value
 * @returns
 */
export const isDataURL = (value: string): boolean => {
  const dataUrlRegex =
    /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\\/?%\s]*)\s*$/i
  return dataUrlRegex.test(value)
}

/**
 * Encrypt password with bcrypt algorithm
 * @param password
 * @returns
 */
export const encryptPassword = async (password: string) => {
  const encryptedPassword = await bcrypt.hash(password, 8)
  return encryptedPassword
}

/**
 * Check if password match
 * @param password
 * @param userPassword
 * @returns
 */
export const isPasswordMatch = async (
  password: string,
  userPassword: string
) => {
  return bcrypt.compare(password, userPassword)
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
