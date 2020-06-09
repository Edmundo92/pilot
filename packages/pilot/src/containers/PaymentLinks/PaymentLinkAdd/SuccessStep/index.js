import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Flexbox,
  ModalContent,
} from 'former-kit'
import copyToClipBoard from 'clipboard-copy'
import IconCopy from 'emblematic-icons/svg/Copy24.svg'
import PaymentLinkActionsContainer from '../PaymentLinkActionsContainer'
import ClickableDiv from '../../../../components/ClickableDiv'
import CreatedLinkSvg from './created_link.svg'

import style from './style.css'

const SuccessStep = ({
  onCreateNewLink,
  paymentLink,
  renderTitle,
  t,
}) => (
  <>
    {renderTitle(t('pages.payment_links.add_link.success.title'))}
    <ModalContent>
      <div className={style.paymentLinkResult}>
        <span className={style.subtitle}>
          {t('pages.payment_links.add_link.success.subtitle')}
        </span>
        <Flexbox alignItems="center" direction="column">
          <div className={style.image}>
            <CreatedLinkSvg />
          </div>
          <ClickableDiv
            className={style.link}
            onClick={() => copyToClipBoard(paymentLink)}
            onKeyPress={() => copyToClipBoard(paymentLink)}
          >
            {paymentLink}
            <IconCopy width="16px" height="16px" />
          </ClickableDiv>
        </Flexbox>
      </div>
    </ModalContent>
    <PaymentLinkActionsContainer>
      <Button onClick={onCreateNewLink}>
        {t('pages.payment_links.add_link.success.new_link')}
      </Button>
    </PaymentLinkActionsContainer>
  </>
)

SuccessStep.propTypes = {
  onCreateNewLink: PropTypes.func,
  paymentLink: PropTypes.string.isRequired,
  renderTitle: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

SuccessStep.defaultProps = {
  onCreateNewLink: () => {},
}

export default SuccessStep
