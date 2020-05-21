import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  assoc,
  identity,
  ifElse,
  isNil,
  map,
  pipe,
  propEq,
  toPairs,
} from 'ramda'
import {
  Button,
  Card,
  CardContent,
  Col,
  Flexbox,
  Grid,
  Row,
  Steps,
  isMomentPropValidation,
} from 'former-kit'

import AnticipationConfirmation from './Confirmation'
import AnticipationForm from './Form'
import AnticipationResult from './Result'
import DetailsHead from '../../components/DetailsHead'
import formatAccountType from '../../formatters/accountType'
import formatAgencyAccount from '../../formatters/agencyAccount'
import formatCpfCnpj from '../../formatters/cpfCnpj'
import { Message, MessageActions } from '../../components/Message'
import EmptyStateIcon from './EmptyStateIcon.svg'

import style from './style.css'

const createStepsStatus = pipe(
  toPairs,
  map(item => ({
    id: item[0],
    status: item[1],
  }))
)

const setCurrentStep = currentStep => ifElse(
  propEq('id', currentStep),
  assoc('status', 'current'),
  identity
)

const buildEmptyState = (onCancel, t) => () => (
  <Flexbox
    alignItems="center"
    className={style.emptyStateBlock}
    direction="column"
  >
    <Message
      image={<EmptyStateIcon width={365} height={148} />}
      message={t('pages.anticipation.no_available_limits')}
    >
      <MessageActions>
        <Button
          onClick={onCancel}
        >
          {t('pages.anticipation.back_to_balance')}
        </Button>
      </MessageActions>
    </Message>
  </Flexbox>
)

class Anticipation extends Component {
  constructor () {
    super()

    this.getStepsStatus = this.getStepsStatus.bind(this)
    this.renderCurrentStep = this.renderCurrentStep.bind(this)
    this.renderRecipient = this.renderRecipient.bind(this)
    this.renderAnticipationForm = this.renderAnticipationForm.bind(this)
  }

  getStepsStatus () {
    const { currentStep, stepsStatus } = this.props
    const steps = createStepsStatus(stepsStatus)

    return map(setCurrentStep(currentStep), steps)
  }

  renderRecipient () {
    const {
      recipient: {
        bank_account: {
          agencia,
          agencia_dv: agenciaDv,
          bank_code: bankCode,
          conta,
          conta_dv: contaDv,
          document_number: documentNumber,
          legal_name: legalName,
          type,
        },
      },
      t,
    } = this.props

    return (
      <Row>
        <Col
          desk={12}
          palm={12}
          tablet={12}
          tv={12}
        >
          <Card>
            <CardContent>
              <DetailsHead
                identifier={legalName}
                properties={[
                  {
                    children: bankCode,
                    title: t('models.bank_account.bank'),
                  },
                  {
                    children: formatAgencyAccount(agencia, agenciaDv),
                    title: t('models.bank_account.agency'),
                  },
                  {
                    children: formatAgencyAccount(conta, contaDv),
                    title: t('models.bank_account.account'),
                  },
                  {
                    children: formatAccountType(t, type),
                    title: t('models.bank_account.account_type'),
                  },
                  {
                    children: formatCpfCnpj(documentNumber),
                    title: t('models.bank_account.document'),
                  },
                ]}
                title={t('models.bank_account.legal_name')}
              />
            </CardContent>
          </Card>
        </Col>
      </Row>
    )
  }

  renderAnticipationForm () {
    const {
      amount,
      approximateRequested,
      automaticTransfer,
      date,
      error,
      loading,
      maximum,
      minimum,
      needsRecalculation,
      onCalculateSubmit,
      onCancel,
      onDataConfirm,
      onFormChange,
      recipient: {
        bank_account: bankAccount,
      },
      requested,
      t,
      timeframe,
      totalCost,
      transferCost,
      validateDay,
    } = this.props

    return (
      maximum
        ? (
          <AnticipationForm
            amount={amount}
            approximateRequested={approximateRequested}
            bankAccount={bankAccount}
            cost={totalCost}
            date={date}
            error={error}
            isAutomaticTransfer={automaticTransfer}
            isValidDay={validateDay}
            loading={loading}
            maximum={maximum}
            minimum={minimum}
            needsRecalculation={needsRecalculation}
            onCalculateSubmit={onCalculateSubmit}
            onCancel={onCancel}
            onChange={onFormChange}
            onConfirm={onDataConfirm}
            requested={requested}
            t={t}
            timeframe={timeframe}
            transferCost={transferCost}
          />
        )
        : null
    )
  }

  renderCurrentStep () {
    const {
      amount,
      approximateRequested,
      automaticTransfer,
      currentStep,
      date,
      error,
      loading,
      maximum,
      onCancel,
      onConfirmationConfirm,
      onConfirmationReturn,
      onTryAgain,
      onViewStatement,
      recipient: {
        bank_account: bankAccount,
      },
      statusMessage,
      stepsStatus,
      t,
      timeframe,
      totalCost,
      transferCost,
    } = this.props

    const renderDataStep = !loading && !isNil(maximum) && maximum < 100
      ? buildEmptyState(onCancel, t)
      : this.renderAnticipationForm

    return (
      <Fragment>
        {currentStep === 'data' && this.renderRecipient()}
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            {currentStep === 'data' && renderDataStep()}
            {currentStep === 'confirmation'
              && (
                <AnticipationConfirmation
                  amount={amount}
                  automaticTransfer={automaticTransfer}
                  bankAccount={bankAccount}
                  date={date}
                  disabled={loading}
                  error={error}
                  onCancel={onCancel}
                  onConfirm={onConfirmationConfirm}
                  onReturn={onConfirmationReturn}
                  requested={approximateRequested}
                  t={t}
                  totalCost={totalCost + transferCost}
                />
              )
            }

            {currentStep === 'result'
              && (
                <AnticipationResult
                  amount={amount}
                  automaticTransfer={automaticTransfer}
                  bankAccount={bankAccount}
                  date={date}
                  onTryAgain={onTryAgain}
                  onViewStatement={onViewStatement}
                  requested={approximateRequested}
                  status={stepsStatus.result}
                  statusMessage={statusMessage}
                  t={t}
                  timeframe={timeframe}
                  totalCost={totalCost + transferCost}
                />
              )
            }
          </Col>
        </Row>
      </Fragment>
    )
  }

  render () {
    const { t } = this.props

    return (
      <Grid>
        <Row>
          <Col
            desk={12}
            palm={12}
            tablet={12}
            tv={12}
          >
            <Card>
              <Steps
                status={this.getStepsStatus()}
                steps={[
                  { id: 'data', title: t('pages.anticipation.data') },
                  { id: 'confirmation', title: t('pages.anticipation.confirmation') },
                  { id: 'result', title: t('pages.anticipation.conclusion') },
                ]}
              />
            </Card>
          </Col>
        </Row>
        {this.renderCurrentStep()}
      </Grid>
    )
  }
}

Anticipation.propTypes = {
  amount: PropTypes.number.isRequired,
  approximateRequested: PropTypes.number,
  automaticTransfer: PropTypes.bool.isRequired,
  currentStep: PropTypes.string.isRequired,
  date: isMomentPropValidation,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  maximum: PropTypes.number,
  minimum: PropTypes.number,
  needsRecalculation: PropTypes.bool,
  onCalculateSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirmationConfirm: PropTypes.func.isRequired,
  onConfirmationReturn: PropTypes.func.isRequired,
  onDataConfirm: PropTypes.func.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  onViewStatement: PropTypes.func.isRequired,
  recipient: PropTypes.shape({
    bank_account: PropTypes.shape({
      agencia: PropTypes.string,
      agencia_dv: PropTypes.string,
      bank_code: PropTypes.string,
      conta: PropTypes.string,
      conta_dv: PropTypes.string,
      document_number: PropTypes.string,
      document_type: PropTypes.string,
      legal_name: PropTypes.string,
      type: PropTypes.string,
    }),
  }),
  requested: PropTypes.number,
  statusMessage: PropTypes.string,
  stepsStatus: PropTypes.shape({}).isRequired,
  t: PropTypes.func.isRequired,
  timeframe: PropTypes.oneOf([
    'distributed',
    'end',
    'start',
  ]).isRequired,
  totalCost: PropTypes.number.isRequired,
  transferCost: PropTypes.number.isRequired,
  validateDay: PropTypes.func.isRequired,
}

Anticipation.defaultProps = {
  approximateRequested: 0,
  date: null,
  error: '',
  maximum: null,
  minimum: null,
  needsRecalculation: false,
  recipient: {
    bank_account: {
      agencia: '',
      agencia_dv: '',
      bank_code: '',
      conta: '',
      conta_dv: '',
      document_number: '',
      document_type: '',
      legal_name: '',
      type: '',
    },
  },
  requested: 0,
  statusMessage: '',
}

export default Anticipation
