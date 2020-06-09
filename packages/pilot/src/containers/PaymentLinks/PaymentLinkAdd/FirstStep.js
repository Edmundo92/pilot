import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  FormInput,
  ModalContent,
  Dropdown,
} from 'former-kit'
import Form from 'react-vanilla-form'
import moment from 'moment'

import createRequiredValidation from '../../../validation/required'
import createNumberValidation from '../../../validation/number'
import createMinLengthValidation from '../../../validation/minLength'
import createLessThanValidation from '../../../validation/lessThan'

import PaymentLinkActionsContainer from './PaymentLinkActionsContainer'
import CurrencyInput from '../../../components/CurrencyInput'
import style from './style.css'

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

const createIsNotIntegerValidation = message => (value) => {
  const isInteger = Number.isInteger(value)
  return !isInteger && message
}

const makeExpirationDateStr = (expirationAmount, expirationUnit, t) => {
  const date = moment().add(expirationAmount, expirationUnit)

  const formatedHours = date.format('HH:mm')
  const formatedDate = date.format('DD/MM/YYYY')

  return t('pages.payment_links.add_link.first_step.expiration_date_string', {
    formatedDate,
    formatedHours,
  })
}

const makeExpirationUnitItem = t => unit => ({
  name: t(unit),
  value: unit,
})

const FirstStep = ({
  formData,
  onChange,
  onSubmit,
  renderBulletSteps,
  renderTitle,
  t,
}) => {
  const getTranslation = (subpath, args = {}) => t(`pages.payment_links.add_link.first_step.${subpath}`, args)

  const isRequired = createRequiredValidation(getTranslation('required_error'))
  const isNumber = createNumberValidation(getTranslation('is_number_error'))
  const isInteger = createIsNotIntegerValidation(
    getTranslation('is_not_integer_error')
  )

  const minCharLength = 2
  const minCharLengthError = createMinLengthValidation(
    minCharLength,
    getTranslation('min_chars_length_error', { length: minCharLength })
  )

  const minimumRequiredPrice = 100
  const priceGreaterThanMinimum = createLessThanValidation(
    minimumRequiredPrice,
    getTranslation('price_greater_than_100_error', { minAmount: minimumRequiredPrice })
  )

  const minAllowedHours = createMinAllowedHours(
    formData.expiration_unit,
    getTranslation
  )

  const maxAllowedDays = createMaxAllowedDays(
    formData.expiration_unit,
    getTranslation
  )

  return (
    <>
      {renderTitle(getTranslation('title'))}
      <Form
        data={formData}
        onChange={onChange}
        onSubmit={(_, errors) => !errors && onSubmit()}
        validateOn="blur"
        validation={{
          amount: [isNumber, priceGreaterThanMinimum],
          expiration_amount: [
            isRequired,
            isInteger,
            minAllowedHours,
            maxAllowedDays,
          ],
          link_name: [isRequired, minCharLengthError],
        }}
      >
        <ModalContent>
          <div className={style.paymentLinkForm}>
            <FormInput label="Nome do link" name="link_name" type="text" />
            <FormInput
              label={getTranslation('price_form_label')}
              name="amount"
              renderer={props => (
                <CurrencyInput max={99999999999} {...props} />
              )}
            />
            <div className={style.expirationDate}>
              <FormInput
                label={getTranslation('time_expiration_form_label')}
                name="expiration_amount"
                type="number"
                value={formData.expiration_amount}
              />
              <Dropdown
                name="expiration_unit"
                options={['minutes', 'hours', 'days', 'months'].map(
                  makeExpirationUnitItem(t)
                )}
              />
            </div>

            {formData.expiration_amount && (
              <span className={style.expirationMessage}>
                {makeExpirationDateStr(
                  formData.expiration_amount,
                  formData.expiration_unit,
                  t
                )}
              </span>
            )}
          </div>
        </ModalContent>
        <PaymentLinkActionsContainer>
          <Button fill="flat" type="submit">
            {t('advance')}
          </Button>
          {renderBulletSteps()}
        </PaymentLinkActionsContainer>
      </Form>
    </>
  )
}

FirstStep.propTypes = {
  formData: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  renderBulletSteps: PropTypes.func.isRequired,
  renderTitle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

FirstStep.defaultProps = {
  onSubmit: () => {},
}

export default FirstStep
