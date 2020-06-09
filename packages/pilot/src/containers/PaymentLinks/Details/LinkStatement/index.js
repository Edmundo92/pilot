import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardContent } from 'former-kit'
import classnames from 'classnames'
import styles from './style.css'
import currency from '../../../../formatters/currency'

const Entry = ({ amount, className, label }) => (
  <div className={classnames(styles.entry, className)}>
    <span className={styles.label}>{label}</span>
    <span className={styles.line} />
    <span className={styles.amount}>{amount}</span>
  </div>
)

Entry.propTypes = {
  amount: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
}

Entry.defaultProps = {
  className: styles.marginSmall,
}

const LinkStatement = ({
  chargebacks,
  fees,
  netAmount,
  paidAmount,
  refunds,
  t,
}) => (
  <Card>
    <CardTitle title={t('pages.payment_links.details.link_statement')} />
    <CardContent>
      <Entry label={t('pages.payment_links.details.paid_amount')} amount={`+ ${currency(paidAmount)}`} />
      {refunds && <Entry label={t('pages.payment_links.details.refunds')} amount={`- ${currency(refunds)}`} />}
      {chargebacks && <Entry label={t('pages.payment_links.details.chargebacks')} amount={`- ${currency(chargebacks)}`} />}
      <Entry className={styles.marginLarge} label={t('pages.payment_links.details.fees')} amount={`- ${currency(fees)}`} />
      <div className={styles.entry}>
        <span className={styles.labelSummary}>{t('pages.payment_links.details.net_amount')}</span>
        <span className={styles.amountSummary}>{currency(netAmount)}</span>
      </div>
    </CardContent>
  </Card>
)

LinkStatement.propTypes = {
  chargebacks: PropTypes.number,
  fees: PropTypes.number.isRequired,
  netAmount: PropTypes.number.isRequired,
  paidAmount: PropTypes.number.isRequired,
  refunds: PropTypes.number,
  t: PropTypes.func.isRequired,
}

LinkStatement.defaultProps = {
  chargebacks: null,
  refunds: null,
}

export default LinkStatement
