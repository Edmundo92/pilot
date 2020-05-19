import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Button } from 'former-kit'

import styles from './style.css'

const Confirmation = ({
  labels: {
    backToLogin,
    confirmation,
    confirmationEmphasis,
  },
  onBackToLogin,
}) => (
  <div
    className={classNames(
      styles.primaryContent,
      styles.confirmationContent
    )}
  >
    <p className={classNames(styles.uppercase, styles.paragraph)}>
      <b>{confirmationEmphasis}</b>
      {' '}
      <span>{confirmation}</span>
    </p>
    <div className={styles.actions}>
      <div className={styles.hugeButton}>
        <Button
          type="button"
          size="huge"
          onClick={onBackToLogin}
        >
          {backToLogin}
        </Button>
      </div>
    </div>
  </div>
)

Confirmation.propTypes = {
  labels: PropTypes.shape({
    backToLogin: PropTypes.string.isRequired,
    confirmation: PropTypes.string.isRequired,
    confirmationEmphasis: PropTypes.string.isRequired,
  }).isRequired,
  onBackToLogin: PropTypes.func.isRequired,
}

export default Confirmation
