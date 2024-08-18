import { ERROR_MSG } from '@/constants/message'
import Joi from 'joi'

/**
 * Validate password
 * @param {string} value
 * @param {Joi.CustomHelpers<string>} helper
 * @returns {boolean} - true if password is valid
 */
export const password: Joi.CustomValidator<string> = (value, helper) => {
  if (value.length < 8) {
    return helper.error(ERROR_MSG.ERR103)
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helper.error(ERROR_MSG.ERR104)
  }
  return value
}
