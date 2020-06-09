import React from 'react'
import PropTypes from 'prop-types'
import {
  Flexbox,
  ModalActions,
} from 'former-kit'
import style from './style.css'

const PaymentLinkActionsContainer = ({ children }) => (
  <ModalActions>
    <Flexbox className={style.paymentLinkActions} justifyContent="center">
      {children}
    </Flexbox>
  </ModalActions>
)

PaymentLinkActionsContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PaymentLinkActionsContainer
