import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  BulletSteps,
  Modal,
  ModalTitle,
} from 'former-kit'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import FirstStep from './FirstStep/FirstStep'
import SecondStep from './SecondStep'
import SuccessStep from './SuccessStep'

const buildRenderTitle = onClose => title => (
  <ModalTitle
    title={title}
    titleAlign="start"
    closeIcon={<IconClose width={12} height={12} />}
    onClose={onClose}
  />
)

const renderBulletSteps = (currentStep) => {
  const status = currentStep === 'first_step'
    ? [
      { id: 'firstStep', status: 'current' },
      { id: 'secondStep', status: 'next' },
    ]
    : [
      { id: 'firstStep', status: 'previous' },
      { id: 'secondStep', status: 'current' },
    ]

  return (
    <BulletSteps
      status={status}
      steps={[{ id: 'firstStep' }, { id: 'secondStep' }]}
    />
  )
}

const firstStepDefaultData = {
  amount: '0',
  expiration_unit: 'days',
}

const boletoInputDefaultValues = {
  boleto_expires_in: undefined,
}

const creditCardInputDefaultValues = {
  free_installments: undefined,
  interest_rate: '0',
  max_installments: undefined,
}

const PaymentLinkAdd = ({
  isOpen,
  loading,
  onClose,
  onCreateNewLink,
  onNextStep,
  onPreviousStep,
  paymentLink,
  step,
  t,
}) => {
  const [formData, setFormData] = useState({
    boleto: false,
    credit_card: false,
    ...firstStepDefaultData,
    ...boletoInputDefaultValues,
    ...creditCardInputDefaultValues,
  })

  const handleFormChange = (newData) => {
    let newFormData = { ...newData }

    if (newFormData.max_installments !== formData.max_installments) {
      newFormData = Object.assign(
        newFormData,
        creditCardInputDefaultValues,
        { max_installments: newFormData.max_installments }
      )
    }

    if (!newFormData.boleto) {
      newFormData = Object.assign(
        newFormData,
        boletoInputDefaultValues
      )
    }

    if (!newFormData.credit_card) {
      newFormData = Object.assign(
        newFormData,
        creditCardInputDefaultValues
      )
    }

    setFormData(newFormData)
  }

  const renderTitle = buildRenderTitle(onClose)

  return (
    <Modal isOpen={isOpen} size="small">
      {
          step === 'first_step' && (
          <FirstStep
            formData={formData}
            onChange={handleFormChange}
            onSubmit={() => onNextStep()}
            t={t}
            renderTitle={renderTitle}
            renderBulletSteps={renderBulletSteps}
          />
          )
      }
      {
        step === 'second_step' && (
          <SecondStep
            formData={formData}
            loading={loading}
            onBack={() => onPreviousStep()}
            onChange={handleFormChange}
            onSubmit={() => onNextStep()}
            t={t}
            renderTitle={renderTitle}
            renderBulletSteps={renderBulletSteps}
          />
        )
      }
      {
        step === 'success_step' && (
          <SuccessStep
            onCreateNewLink={onCreateNewLink}
            paymentLink={paymentLink}
            t={t}
            renderTitle={renderTitle}
          />
        )
      }
    </Modal>
  )
}

PaymentLinkAdd.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onCreateNewLink: PropTypes.func,
  onNextStep: PropTypes.func.isRequired,
  onPreviousStep: PropTypes.func.isRequired,
  paymentLink: PropTypes.string,
  step: PropTypes.oneOf([
    'first_step',
    'second_step',
    'success_step',
    'error_step',
  ]).isRequired,
  t: PropTypes.func.isRequired,
}

PaymentLinkAdd.defaultProps = {
  onClose: () => {},
  onCreateNewLink: () => {},
  paymentLink: null,
}

export default PaymentLinkAdd
