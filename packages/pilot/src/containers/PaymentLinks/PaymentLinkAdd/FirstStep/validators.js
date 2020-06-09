import {
  find, is, juxt, pipe,
} from 'ramda'
import moment from 'moment'
import createRequiredValidation from '../../../../validation/required'
import createNumberValidation from '../../../../validation/number'
import createMinLengthValidation from '../../../../validation/minLength'
import createMaxLengthValidaton from '../../../../validation/maxLength'
import createLessThanValidation from '../../../../validation/lessThan'

const applyValidations = (validations, value) => pipe(
  juxt(validations),
  find(is(String))
)(value)

const getDateDurationInMinutes = (timeAmount, timeUnit) => {
  const date = moment().add(timeAmount, timeUnit)
  const duration = moment.duration(date.diff(moment()))
  return duration.asMinutes()
}

const createMinAllowedHours = (timeUnit, getTranslation) => (
  timeAmount
) => {
  const durationInMinutes = getDateDurationInMinutes(timeAmount, timeUnit)

  const minAllowedHours = 1
  const minAllowedMinutes = minAllowedHours * 60
  return durationInMinutes < minAllowedMinutes && getTranslation('min_allowed_hours_error', { hours: minAllowedHours })
}

const createMaxAllowedDays = (timeUnit, getTranslation) => (timeAmount) => {
  const durationInMinutes = getDateDurationInMinutes(timeAmount, timeUnit)

  const maxAllowedDays = 186
  const maxAllowedMinutes = maxAllowedDays * 24 * 60
  return durationInMinutes > maxAllowedMinutes && getTranslation('max_allowed_days_error', { days: maxAllowedDays })
}

export const validateExpirationAmount = (
  expirationUnit, getTranslation
) => (value) => {
  const isRequired = createRequiredValidation(getTranslation('required_error'))
  const isNumber = createNumberValidation(getTranslation('is_not_integer_error'))
  const minAllowedHours = createMinAllowedHours(expirationUnit, getTranslation)
  const maxAllowedDays = createMaxAllowedDays(expirationUnit, getTranslation)

  return applyValidations([
    isRequired,
    isNumber,
    minAllowedHours,
    maxAllowedDays,
  ],
  value)
}

export const validateAmount = getTranslation => (value) => {
  const isNumber = createNumberValidation(getTranslation('is_number_error'))

  const minimumRequiredPrice = 100
  const priceGreaterThanMinimum = createLessThanValidation(
    minimumRequiredPrice,
    getTranslation('price_greater_than_100_error', { minAmount: minimumRequiredPrice })
  )

  return applyValidations([
    isNumber,
    priceGreaterThanMinimum,
  ],
  value)
}

export const validateName = getTranslation => (value = '') => {
  const isRequired = createRequiredValidation(getTranslation('required_error'))

  const minCharLength = 2
  const minCharLengthError = createMinLengthValidation(
    minCharLength,
    getTranslation('min_chars_length_error', { length: minCharLength })
  )

  const maxCharLength = 255
  const maxCharLengthError = createMaxLengthValidaton(
    maxCharLength,
    getTranslation('max_chars_length_error', { length: maxCharLength })
  )

  return applyValidations([
    isRequired,
    maxCharLengthError,
    minCharLengthError,
  ],
  value)
}

