import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardContent } from 'former-kit'
import classnames from 'classnames'
import styles from './style.css'
import currency from '../../../../formatters/currency'
import EmptyState from './empty_state.svg'

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

const renderEmptyState = t => (
  <div className={styles.emptyState}>
    <EmptyState />
    <p className={styles.centerText}>{t('pages.payment_links.details.link_statement.empty_state')}</p>
  </div>
)

const renderEntries = (
  chargebacks,
  fees,
  netAmount,
  paidAmount,
  refunds,
  t
) => (
  <>
    <Entry
      label={t('pages.payment_links.details.link_statement.paid_amount')}
      amount={`+ ${currency(paidAmount)}`}
    />
    {refunds
     && (
     <Entry
       label={t('pages.payment_links.details.link_statement.refunds')}
       amount={`- ${currency(refunds)}`}
     />
     )}
    {chargebacks
     && (
     <Entry
       label={t('pages.payment_links.details.link_statement.chargebacks')}
       amount={`- ${currency(chargebacks)}`}
     />
     )}
    <Entry
      className={styles.marginLarge}
      label={t('pages.payment_links.details.link_statement.fees')}
      amount={`- ${currency(fees)}`}
    />
    <div className={styles.entry}>
      <span className={styles.labelSummary}>
        {t('pages.payment_links.details.link_statement.net_amount')}
      </span>
      <span className={styles.amountSummary}>
        {currency(netAmount)}
      </span>
    </div>
  </>
)

const LinkStatement = ({
  chargebacks,
  enableEmptyState,
  fees,
  netAmount,
  paidAmount,
  refunds,
  t,
}) => (
  <Card>
    <CardTitle title={t('pages.payment_links.details.link_statement.title')} />
    <CardContent>
      {enableEmptyState
        ? renderEmptyState(t)
        : renderEntries(chargebacks, fees, netAmount, paidAmount, refunds, t)}
    </CardContent>
  </Card>
)

LinkStatement.propTypes = {
  chargebacks: PropTypes.number,
  enableEmptyState: PropTypes.bool,
  fees: PropTypes.number,
  netAmount: PropTypes.number,
  paidAmount: PropTypes.number,
  refunds: PropTypes.number,
  t: PropTypes.func.isRequired,
}

LinkStatement.defaultProps = {
  chargebacks: null,
  enableEmptyState: false,
  fees: 0,
  netAmount: 0,
  paidAmount: 0,
  refunds: null,
}

export default LinkStatement
