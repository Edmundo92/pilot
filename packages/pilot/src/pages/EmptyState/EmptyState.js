import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  always,
  anyPass,
  applySpec,
  compose,
  equals,
  find,
  head,
  not,
  path,
  pathOr,
  propOr,
  pluck,
  pipe,
  prop,
  propEq,
  split,
  when,
} from 'ramda'
import { translate } from 'react-i18next'
import EmptyStateContainer from '../../containers/EmptyState'
import { withError } from '../ErrorBoundary'
import environment from '../../environment'
import {
  requestOnboardingAnswers as requestOnboardingAnswersAction,
} from './actions'
import isOnboardingComplete from '../../validation/isOnboardingComplete'

const getUserName = pipe(prop('name'), split(' '), head)

const hasAdminPermission = propEq('permission', 'admin')

const getAccessKeys = applySpec({
  apiKey: path(['api_key', environment]),
  encryptionKey: path(['encryption_key', environment]),
})

const getAntifraudCost = pipe(
  pathOr([], ['gateway', environment, 'antifraud_cost']),
  find(propEq('name', 'pagarme')),
  prop('cost')
)

const getAlreadyTransacted = propOr(true, 'alreadyTransacted')

const notDefaultInstallments = pipe(
  pluck('installment'),
  anyPass([equals([1, 2, 7]), equals([1])]),
  not
)

const getInstallmentsFee = pipe(
  pathOr([], ['psp', environment, 'mdrs']),
  find(propEq('payment_method', 'credit_card')),
  pathOr([], ['installments']),
  when(notDefaultInstallments, always([]))
)

const getFees = pipe(
  prop('pricing'),
  applySpec({
    anticipation: path(['psp', environment, 'anticipation']),
    antifraud: getAntifraudCost,
    boleto: path(['gateway', environment, 'boletos', 'payment_fixed_fee']),
    gateway: path(['gateway', environment, 'transaction_cost', 'credit_card']),
    installments: getInstallmentsFee,
    transfer: path(['transfers', 'ted']),
  })
)

const mapDispatchToProps = {
  requestOnboardingAnswers: requestOnboardingAnswersAction,
}

const mapStateToProps = ({
  account: {
    company,
    user,
  },
  welcome: {
    onboardingAnswers,
  },
}) => ({
  accessKeys: getAccessKeys(company),
  alreadyTransacted: getAlreadyTransacted(company),
  fees: getFees(company),
  isAdmin: hasAdminPermission(user),
  isMDRzao: propEq('anticipationType', 'MDRZAO', company),
  onboardingAnswers,
  userName: getUserName(user),
})

const enhanced = compose(
  translate(),
  connect(mapStateToProps, mapDispatchToProps),
  withError
)

const hideEmptyState = push => () => {
  localStorage.setItem('hide_empty-state', true)
  return push('/home')
}

const shouldRedirectToOnboarding = (alreadyTransacted, onboardingAnswers) => {
  if (localStorage.getItem('skip-onboarding')) {
    return false
  }

  return !alreadyTransacted && !isOnboardingComplete(onboardingAnswers)
}

const EmptyState = ({
  accessKeys,
  alreadyTransacted,
  fees,
  history: {
    push,
  },
  isAdmin,
  isMDRzao,
  onboardingAnswers,
  requestOnboardingAnswers,
  t,
  userName,
}) => {
  useEffect(() => {
    requestOnboardingAnswers()
  }, [requestOnboardingAnswers])

  useEffect(() => {
    if (onboardingAnswers
      && isAdmin
      && shouldRedirectToOnboarding(alreadyTransacted, onboardingAnswers)) {
      push('/onboarding')
    }
  }, [alreadyTransacted, isAdmin, onboardingAnswers, push])

  return (
    <EmptyStateContainer
      apiKey={accessKeys.apiKey}
      encryptionKey={accessKeys.encryptionKey}
      environment={environment}
      fees={fees}
      isAdmin={isAdmin}
      isMDRzao={isMDRzao}
      onboardingAnswers={onboardingAnswers}
      onDisableWelcome={hideEmptyState(push)}
      t={t}
      userName={userName}
    />
  )
}

EmptyState.propTypes = {
  accessKeys: PropTypes.shape({
    apiKey: PropTypes.string,
    encryptionKey: PropTypes.string,
  }),
  alreadyTransacted: PropTypes.bool,
  fees: PropTypes.shape({
    anticipation: PropTypes.number,
    antifraud: PropTypes.number,
    boleto: PropTypes.number,
    gateway: PropTypes.number,
    installments: PropTypes.arrayOf(PropTypes.shape({
      installment: PropTypes.number.isRequired,
      mdr: PropTypes.number.isRequired,
    })),
    transfer: PropTypes.number,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isMDRzao: PropTypes.bool,
  onboardingAnswers: PropTypes.shape({}),
  requestOnboardingAnswers: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userName: PropTypes.string,
}

EmptyState.defaultProps = {
  accessKeys: {},
  alreadyTransacted: true,
  fees: {},
  isMDRzao: false,
  onboardingAnswers: undefined,
  userName: '',
}

export default enhanced(EmptyState)
