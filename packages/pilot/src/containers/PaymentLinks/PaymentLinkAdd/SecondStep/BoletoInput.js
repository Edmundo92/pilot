import React from 'react'
import { FormInput } from 'former-kit'
import BarCode from 'emblematic-icons/svg/BarCode32.svg'
import PaymentMethodToggle from './PaymentMethodToggle'
import styles from './style.css'

const renderBoletoInput = (formData, t) => (
  <div>
    <PaymentMethodToggle
      Icon={BarCode}
      name="boleto"
      label={t('pages.payment_links.add_link.second_step.boleto')}
      t={t}
      value={formData.boleto}
    />
    <p className={styles.boletoInfo}>
      {t('pages.payment_links.add_link.second_step.boleto_info_1')}
      <br />{t('pages.payment_links.add_link.second_step.boleto_info_2')}
    </p>
    <FormInput
      disabled={!formData.boleto}
      label={t('pages.payment_links.add_link.second_step.boleto_input_label')}
      name="boleto_expires_in"
      type="text"
    />
  </div>
)

export default renderBoletoInput
