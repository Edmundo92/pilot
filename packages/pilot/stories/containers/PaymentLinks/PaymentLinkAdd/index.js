import React, { useState } from 'react'
import { path, split } from 'ramda'
import { BulletSteps, Modal, ModalTitle } from 'former-kit'
import PaymentLinkSuccessStep from '../../../../src/containers/PaymentLinks/PaymentLinkAdd/SuccessStep'
import PaymentLinkErrorStep from '../../../../src/containers/PaymentLinks/PaymentLinkAdd/ErrorStep'
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

const PaymentLinkAddExample = () => {
  const [step, setStep] = useState('first_step')
  const [loading, setLoading] = useState(false)
  const paymentLink = 'link.pagar.me/tBy6bncOoN'

  const onCreateLink = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('success_step')
    }, 2000)
  }

  const onCreateNewLink = () => setStep('first_step')

  const onNextStep = () => {
    if (step === 'first_step') {
      return setStep('second_step')
    }

    return onCreateLink()
  }

  const onPreviousStep = () => setStep('first_step')

  return (
    <PaymentLinkAdd
      loading={loading}
      isOpen
      onNextStep={onNextStep}
      onPreviousStep={onPreviousStep}
      onCreateNewLink={onCreateNewLink}
      paymentLink={paymentLink}
      step={step}
      t={t}
    />
  )
}

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
    <PaymentLinkSecondStep
      formData={{}}
      renderTitle={renderTitle}
      renderBulletSteps={renderBulletSteps}
      t={t}
    />
  </Modal>
)

const PaymentLinkSuccessStepExample = () => (
  <Modal size="small" isOpen>
    <PaymentLinkSuccessStep
      t={t}
      paymentLink="link.pagar.me/tBy6bncOoN"
      renderTitle={renderTitle}
    />
  </Modal>
)

const PaymentLinkErrorStepExample = () => (
  <Modal size="small" isOpen>
    <PaymentLinkErrorStep t={t} renderTitle={renderTitle} />
  </Modal>

)

export default {
  PaymentLinkAddModal: PaymentLinkAddExample,
  PaymentLinkErrorStep: PaymentLinkErrorStepExample,
  PaymentLinkFirstStep: PaymentLinkFirstStepExample,
  PaymentLinkSecondStep: PaymentLinkSecondStepExample,
  PaymentLinkSuccessStep: PaymentLinkSuccessStepExample,
}
