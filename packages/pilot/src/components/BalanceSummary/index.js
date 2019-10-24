import React from 'react'
import PropTypes from 'prop-types'
import { keys } from 'ramda'
import classNames from 'classnames'
import Summary from '../Summary'
import TotalDisplay from '../TotalDisplay'

import style from './style.css'

const colors = {
  net: '#4ca9d7',
  outcoming: '#37cc9a',
  outgoing: '#ff796f',
}

const BalanceSummary = ({ amount, base, loading }) => (
  <Summary base={base}>
    {
      keys(amount).map(type => (
        <div
          className={style.summaryContent}
          key={type}
        >
          <div className={
            classNames(style.content, {
              [style[base]]: base,
            })
          }
          >
            <TotalDisplay
              align="center"
              amount={amount[type].value}
              amountSize="large"
              color={colors[type]}
              title={amount[type].title}
              titleColor={colors[type]}
              titleSize="medium"
              loading={loading}
            />
          </div>
        </div>
      ))
    }
  </Summary>
)

const totalShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  value: PropTypes.number,
})

BalanceSummary.propTypes = {
  amount: PropTypes.shape({
    net: totalShape,
    outcoming: totalShape,
    outgoing: totalShape,
  }),
  base: PropTypes.oneOf(['light', 'dark']),
  loading: PropTypes.bool.isRequired,
}
BalanceSummary.defaultProps = {
  amount: {},
  base: 'dark',
}

export default BalanceSummary
