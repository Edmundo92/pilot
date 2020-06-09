import { juxt, is } from 'ramda'

import createRequiredValidation from '../../../../validation/required'
import createNumberValidation from '../../../../validation/number'
import createLessThanValidation from '../../../../validation/lessThan'
import createMoreThanValidation from '../../../../validation/greaterThan'

const isString = is(String)

const isRequired = t => createRequiredValidation(t('pages.payment_links.add_link.second_step.required_error'))
const isInteger = t => createNumberValidation(t('pages.payment_links.add_link.second_step.is_integer_error'))

const isNumber = message => value => Number.isNaN(Number(value)) && message

export const validateBoletoExpiresIn = (boletoEnabled, t) => (value) => {
  if (!boletoEnabled) {
    return false
  }

  const maxValue = 3650
  const greaterThan3650 = createMoreThanValidation(
    maxValue,
    t('pages.payment_links.add_link.second_step.max_value_error', {
      value: maxValue,
    })
  )

  const validationsOutput = juxt([
    isRequired(t),
    isInteger(t),
    greaterThan3650,
  ])(value)

  return validationsOutput.find(isString)
}

export const validateRequiredField = (isEnabled, t) => (value) => {
  if (!isEnabled) {
    return false
  }

  return isRequired(t)(value)
}

export const validateInterestRate = (creditCardEnabled, t) => (value) => {
  if (!creditCardEnabled) {
    return false
  }

  const minValue = 0
  const lessThan0 = createLessThanValidation(
    minValue,
    t('pages.payment_links.add_link.second_step.min_value_error', {
      value: minValue,
    })
  )

  const maxValue = 100
  const greaterThan100 = createMoreThanValidation(
    maxValue,
    t('pages.payment_links.add_link.second_step.max_value_error', {
      value: maxValue,
    })
  )

  const validationsOutput = juxt([
    isRequired(t),
    isNumber(t('pages.payment_links.add_link.second_step.is_number_error')),
    lessThan0,
    greaterThan100,
  ])(value)

  return validationsOutput.find(isString)
}
