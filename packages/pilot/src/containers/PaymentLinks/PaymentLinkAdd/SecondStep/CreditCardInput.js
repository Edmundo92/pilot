import React from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown,
  FormInput,
} from 'former-kit'
import { range } from 'ramda'
import Card from 'emblematic-icons/svg/Card32.svg'
import PaymentMethodToggle from './PaymentMethodToggle'
import styles from './style.css'

const buildInstallmentsValues = (t) => {
  const installmentsRange = range(1, 13)

  return installmentsRange.map((value) => {
    const translationPath = value === 1
      ? 'installment_value_singular'
      : 'installment_value_plural'

    return {
      name: t(`pages.payment_links.add_link.second_step.${translationPath}`, { installment: value }),
      value: String(value),
    }
  })
}

const buildInterestFeesOptions = (
  installments, t
) => {
  const interestFreeOption = {
    name: t('pages.payment_links.add_link.second_step.without_fee_options'),
    value: '0',
  }

  if (installments <= 1) {
    return [interestFreeOption]
  }

  const withInterestOptionsRange = range(1, Number(installments))
  const withInterestOptions = withInterestOptionsRange.map((value) => {
    const translationPath = value === 1
      ? 'installment_options_singular'
      : 'installment_options_plural'

    return {
      name: t(`pages.payment_links.add_link.second_step.${translationPath}`, { installment: value }),
      value: String(value),
    }
  })

  return [
    interestFreeOption,
    ...withInterestOptions,
  ]
}

const renderCreditCardInput = (formData, t) => (
  <div className={styles.creditCardContainer}>
    <PaymentMethodToggle
      Icon={Card}
      name="credit_card"
      label={t('pages.payment_links.add_link.second_step.credit_card')}
      t={t}
      value={formData.credit_card}
    />
    <div className={styles.creditCardOptions}>
      <Dropdown
        disabled={!formData.credit_card}
        name="max_installments"
        placeholder={t('pages.payment_links.add_link.second_step.max_installments_label')}
        options={buildInstallmentsValues(t)}
        value={formData.max_installments}
      />
      <Dropdown
        disabled={!formData.credit_card}
        name="free_installments"
        placeholder={t('pages.payment_links.add_link.second_step.transfer_fees_label')}
        options={buildInterestFeesOptions(formData.max_installments, t)}
      />
      {formData.free_installments > 0 && formData.credit_card && (
        <InterestFees
          name="interest_rate"
          t={t}
        />
      )}
    </div>
  </div>
)

const InterestFees = ({
  error,
  name,
  onChange,
  t,
  value,
}) => (
  <div className={styles.percentPerMonth}>
    <div>
      {t('pages.payment_links.add_link.second_step.percent_per_month_1')}
      <span>{t('pages.payment_links.add_link.second_step.percent_per_month_2')}</span>
      <div className={styles.formInput}>
        <FormInput name={name} onChange={onChange} type="text" value={value} />
      </div>%
    </div>
    { error && <p>{error}</p> }
  </div>
)

InterestFees.propTypes = {
  error: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  t: PropTypes.func.isRequired,
  value: PropTypes.string,
}

InterestFees.defaultProps = {
  error: '',
  name: '',
  onChange: null,
  value: '',
}

export default renderCreditCardInput
