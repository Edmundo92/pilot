import React from 'react'
import { path, split } from 'ramda'
import { BulletSteps, Modal, ModalTitle } from 'former-kit'
import PaymentLinkResult from '../../../../src/containers/PaymentLinks/PaymentLinkAdd/Result'
import PaymentLinkFirstStep from '../../../../src/containers/PaymentLinks/PaymentLinkAdd/FirstStep/FirstStep'
import PaymentLinkSecondStep from '../../../../src/containers/PaymentLinks/PaymentLinkAdd/SecondStep'
import PaymentLinkAdd from '../../../../src/containers/PaymentLinks/PaymentLinkAdd'

import translations from '../../../../public/locales/pt/translations.json'

const t = sentence => path(split('.', sentence), translations)

const renderTitle = title => (
  <ModalTitle
    title={title}
    titleAlign="start"
  />
)

const renderBulletSteps = () => (
  <BulletSteps
    status={[
      { id: 'firstStep', status: 'current' },
      { id: 'secondStep', status: 'next' },
    ]}
    steps={[{ id: 'firstStep' }, { id: 'secondStep' }]}
  />
)

const PaymentLinkFirstStepExample = () => (
  <Modal size="small" isOpen>
    <PaymentLinkFirstStep
      formData={{
        amount: '0',
        expiration_unit: 'days',
      }}
      renderTitle={renderTitle}
      renderBulletSteps={renderBulletSteps}
      t={t}
    />
  </Modal>
)

const PaymentLinkSecondStepExample = () => (
  <Modal size="small" isOpen>
    <PaymentLinkSecondStep t={t} />
  </Modal>
)

const PaymentLinkResultExample = () => (
  <Modal size="small" isOpen>
    <PaymentLinkResult t={t} paymentLink="link.pagar.me/tBy6bncOoN" />
  </Modal>
)

const PaymentLinkAddExample = () => (
  <PaymentLinkAdd isOpen t={t} />
)

export default {
  PaymentLinkAddModal: PaymentLinkAddExample,
  PaymentLinkFirstStep: PaymentLinkFirstStepExample,
  PaymentLinkResult: PaymentLinkResultExample,
  PaymentLinkSecondStep: PaymentLinkSecondStepExample,
}
