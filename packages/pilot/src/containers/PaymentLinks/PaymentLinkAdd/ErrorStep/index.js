import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Flexbox,
  ModalContent,
} from 'former-kit'
import PaymentLinkActionsContainer from '../PaymentLinkActionsContainer'
import ErrorLinkSvg from './error_link.svg'

import style from './style.css'

const ErrorStep = ({
  onCreateNewLink,
  renderTitle,
  t,
}) => (
  <>
    {renderTitle(t('pages.payment_links.add_link.error.title'))}
    <ModalContent>
      <div className={style.paymentLinkResult}>
        <Flexbox alignItems="center" direction="column">
          <div className={style.image}>
            <ErrorLinkSvg />
          </div>
          <span className={style.errorInfo}>
            {t('pages.payment_links.add_link.error.error_info_1')}<br />
            {t('pages.payment_links.add_link.error.error_info_2')}
          </span>
        </Flexbox>
      </div>
    </ModalContent>
    <PaymentLinkActionsContainer>
      <Button fill="outline" onClick={onCreateNewLink}>
        {t('pages.payment_links.add_link.error.retry_button')}
      </Button>
    </PaymentLinkActionsContainer>
  </>
)

ErrorStep.propTypes = {
  onCreateNewLink: PropTypes.func,
  renderTitle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ErrorStep.defaultProps = {
  onCreateNewLink: () => {},
}

export default ErrorStep
