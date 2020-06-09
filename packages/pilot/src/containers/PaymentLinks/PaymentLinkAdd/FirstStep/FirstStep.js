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
import PaymentLinkActionsContainer from '../PaymentLinkActionsContainer'
import CurrencyInput from '../../../../components/CurrencyInput'
import { validateAmount, validateExpirationAmount, validateName } from './validators'
import style from './style.css'

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

  return (
    <>
      {renderTitle(getTranslation('title'))}
      <Form
        data={formData}
        onChange={onChange}
        onSubmit={(_, errors) => !errors && onSubmit()}
        validateOn="blur"
        validation={{
          amount: validateAmount(getTranslation),
          expiration_amount: validateExpirationAmount(
            formData.expiration_unit, getTranslation
          ),
          name: validateName(getTranslation),
        }}
      >
        <ModalContent>
          <div className={style.paymentLinkForm}>
            <FormInput label="Nome do link" name="name" type="text" />
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
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  renderBulletSteps: PropTypes.func.isRequired,
  renderTitle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

FirstStep.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
}

export default FirstStep
