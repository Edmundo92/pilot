import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  BulletSteps,
  Modal,
  ModalTitle,
} from 'former-kit'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import FirstStep from './FirstStep'

const buildRenderTitle = onClose => title => (
  <ModalTitle
    title={title}
    titleAlign="start"
    closeIcon={<IconClose width={12} height={12} />}
    onClose={onClose}
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

const steps = {
  FIRST_STEP: 'first_step',
  LAST_STEP: 'last_step',
  SECOND_STEP: 'second_step',
}

const firstStepDefaultData = {
  amount: '0',
  expiration_unit: 'days',
}

const PaymentLinkAdd = ({ isOpen, onClose, t }) => {
  const [step, setStep] = useState(steps.FIRST_STEP)
  const [formData, setFormData] = useState({
    ...firstStepDefaultData,
  })

  const handleFormChange = (newData) => {
    setFormData(newData)
  }

  const renderTitle = buildRenderTitle(onClose)

  return (
    <Modal isOpen={isOpen} size="small">
      {
          step === steps.FIRST_STEP && (
          <FirstStep
            formData={formData}
            onChange={handleFormChange}
            onSubmit={() => setStep('second_step')}
            t={t}
            renderTitle={renderTitle}
            renderBulletSteps={renderBulletSteps}
          />
          )
      }
    </Modal>
  )
}

PaymentLinkAdd.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  t: PropTypes.func.isRequired,
}

PaymentLinkAdd.defaultProps = {
  onClose: () => {},
}

export default PaymentLinkAdd
