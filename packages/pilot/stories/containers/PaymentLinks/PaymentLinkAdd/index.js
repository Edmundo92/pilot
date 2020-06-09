import React, { useState } from 'react'
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

const PaymentLinkAddExample = () => {
  const [step, setStep] = useState('first_step')
  const [loading, setLoading] = useState(false)

  const onCreateLink = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('success_step')
    }, 2000)
  }

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

const PaymentLinkResultExample = () => (
  <Modal size="small" isOpen>
    <PaymentLinkResult t={t} paymentLink="link.pagar.me/tBy6bncOoN" />
  </Modal>
)

export default {
  PaymentLinkAddModal: PaymentLinkAddExample,
  PaymentLinkFirstStep: PaymentLinkFirstStepExample,
  PaymentLinkResult: PaymentLinkResultExample,
  PaymentLinkSecondStep: PaymentLinkSecondStepExample,
}
