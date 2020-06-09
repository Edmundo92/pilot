import React from 'react'
import { storiesOf } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'

import AnticipationForm from './Anticipation/Form'
import BankAccountSelector from './Settings/BankAccount/Selector'
import Balance from './Balance'
import BankAccountForm from './Settings/BankAccount/Add'
import AddAccount from './AddRecipient/BankAccountStep/AddAccount'
import BankAccountStep from './AddRecipient/BankAccountStep'
import ConfirmRecipientStep from './AddRecipient/ConfirmStep'
import BoletoForm from './Refund/BoletoForm'
import BoletoRefundConfirm from './Refund/BoletoConfirmation'
import BoletoRefundResult from './Refund/BoletoResult'
import CardConfirmation from './Refund/CardConfirmation'
import CardForm from './Refund/CardForm'
import CardResult from './Refund/CardResult'
import RecipientListState from './RecipientList'
import AntifraudSettings from './Settings/Antifraud'

import {
  ManualReviewApproveForm,
  ManualReviewRefuseForm,
} from './ManualReview/Form'

import {
  ManualReviewApproveResult,
  ManualReviewRefuseResult,
  ManualReviewErrorResult,
} from './ManualReview/Result'

import {
  ManualReviewStepApproveConfirmation,
  ManualReviewStepApproveResult,
  ManualReviewStepRefuseConfirmation,
  ManualReviewStepRefuseResult,
  ManualReviewStepResultError,
} from './ManualReview'

import {
  BoletoRefund,
  CreditCardRefund,
} from './Refund'

import Capture from './Capture'

import {
  CaptureFormExample,
  FixedCaptureFormExample,
} from './Capture/Form'

import CaptureResult from './Capture/Result'
import IdentificationStep from './AddRecipient/IdentificationStep'
import Reprocess from './Reprocess'
import ReprocessForm from './Reprocess/Form'
import ReprocessConfirmation from './Reprocess/Confirmation'
import ReprocessResult from './Reprocess/Result'
import SelectAccount from './AddRecipient/BankAccountStep/SelectAccount'
import Withdraw from './Withdraw'
import WithdrawConfirmation from './Withdraw/Confirmation'
import WithdrawForm from './Withdraw/Form'
import WithdrawResultSuccess from './Withdraw/Result/Success'
import WithdrawResultError from './Withdraw/Result/Error'

import {
  AnticipationConfirmationDisabled,
  AnticipationConfirmationWithAutomaticTransfer,
  AnticipationConfirmationWithError,
  AnticipationConfirmationWithoutAutomaticTransfer,
} from './Anticipation/Confirmation'

import {
  AnticipationResultError,
  AnticipationResultWithAutomaticTransfer,
  AnticipationResultWithoutAutomaticTransfer,
} from './Anticipation/Result'

import Anticipation from './Anticipation'
import BoletoConfigurationForm from './Settings/Boleto/Form'
import BankAccount from './Settings/BankAccount'
import Home from './Home'
import ConclusionStep from './AddRecipient/ConclusionStep'

import {
  ErrorStepSubmit,
  ErrorStepLogin,
  ErrorStepPermission,
  ErrorStepServer,
  ErrorStepDefault,
  ErrorCannotCreateRecipient,
} from './AddRecipient/ErrorStep'

import ConfigurationStep from './AddRecipient/ConfigurationsStep'
import RecipientBalance from './RecipientDetails/Balance'

import {
  AddRecipientFetchError,
  AddRecipientSubmitError,
  AddRecipientSuccess,
  AddRecipientSuccessNoAccounts,
} from './AddRecipient'

import RecipientDetailConfig from './RecipientDetails/Config'
import RecipientDetailInfo from './RecipientDetails/Info'
import RecipientDetails from './RecipientDetails'

import EmptyState from './EmptyState'

import Onboarding from './Onboarding'

import PaymentLinks from './PaymentLinks'

storiesOf('Containers|Bank/Account', module)
  .add('selector', () => <BankAccountSelector />)
  .add('settings', () => <BankAccount />)

storiesOf('Containers|Onboarding')
  .add('With Card, Icon and Subtitle', () => (
    <Onboarding.WithCardIconAndSubtitle />
  ))
  .add('With Card, Icon and Without Subtitle', () => (
    <Onboarding.WithCardIconAndWithoutSubtitle />
  ))
  .add('With Card, Without Icon and Subtitle', () => (
    <Onboarding.WithCardWithoutIconAndSubtitle />
  ))
  .add('When Dropdown', () => (
    <Onboarding.WithDropdown />
  ))
  .add('When Loading Question', () => (
    <Onboarding.WhenLoading />
  ))
  .add('When DeadEnd', () => (
    <Onboarding.WhenDeadEnd />
  ))

storiesOf('Containers|Page containers', module)
  .addDecorator(withA11y)
  .add('Boleto Configuration Form', () => (
    <BoletoConfigurationForm />
  ))
  .add('Recipient Detail Info', () => (
    <RecipientDetailInfo />
  ))
  .add('Recipient Details', () => (
    <RecipientDetails />
  ))
  .add('Recipient Configuration', () => (
    <RecipientDetailConfig />
  ))
  .add('Recipient Balance', () => (
    <RecipientBalance />
  ))
  .add('Add Recipient', () => (
    <AddRecipientSuccess />
  ))
  .add('Add Recipient no previous accounts', () => (
    <AddRecipientSuccessNoAccounts />
  ))
  .add('Add Recipient fetch accounts error', () => (
    <AddRecipientFetchError />
  ))
  .add('Add Recipient submit error', () => (
    <AddRecipientSubmitError />
  ))
  .add('Recipient Conclusion Step', () => (
    <ConclusionStep />
  ))
  .add('Recipient Error Step default', () => (
    <ErrorStepDefault />
  ))
  .add('Recipient Error Step submit', () => (
    <ErrorStepSubmit />
  ))
  .add('Recipient Error Step login', () => (
    <ErrorStepLogin />
  ))
  .add('Recipient Error Step permission', () => (
    <ErrorStepPermission />
  ))
  .add('Recipient Error Step cannot create recipient', () => (
    <ErrorCannotCreateRecipient />
  ))
  .add('Recipient Error Step server', () => (
    <ErrorStepServer />
  ))
  .add('Recipient Configuration Step', () => (
    <ConfigurationStep />
  ))
  .add('Anticipation Form', () => (
    <AnticipationForm />
  ))
  .add('Add Account', () => (
    <AddAccount />
  ))
  .add('Recipient Confirm Step', () => (
    <ConfirmRecipientStep />
  ))
  .add('Bank Account Step', () => (
    <BankAccountStep />
  ))
  .add('Recipient list', () => (
    <RecipientListState />
  ))
  .add('Recipient identification step', () => (
    <IdentificationStep />
  ))
  .add('Manual review approve form', () => (
    <ManualReviewApproveForm />
  ))
  .add('Manual review refuse form', () => (
    <ManualReviewRefuseForm />
  ))
  .add('Manual review approve result', () => (
    <ManualReviewApproveResult />
  ))
  .add('Manual review refuse result', () => (
    <ManualReviewRefuseResult />
  ))
  .add('Manual review result error', () => (
    <ManualReviewErrorResult />
  ))
  .add('Manual review step approve confirmation', () => (
    <ManualReviewStepApproveConfirmation />
  ))
  .add('Manual review step approve result', () => (
    <ManualReviewStepApproveResult />
  ))
  .add('Manual review step refuse confirmation', () => (
    <ManualReviewStepRefuseConfirmation />
  ))
  .add('Manual review step refuse result', () => (
    <ManualReviewStepRefuseResult />
  ))
  .add('Manual review step result error', () => (
    <ManualReviewStepResultError />
  ))
  .add('Boleto form', () => (
    <BoletoForm />
  ))
  .add('Antifraud settings', () => (
    <AntifraudSettings />
  ))
  .add('Boleto refund confirm', () => (
    <BoletoRefundConfirm />
  ))
  .add('Boleto refund result', () => (
    <BoletoRefundResult />
  ))
  .add('Card refund confirmation', () => (
    <CardConfirmation />
  ))
  .add('Card refund result', () => (
    <CardResult />
  ))
  .add('Card refund form', () => (
    <CardForm />
  ))
  .add('Boleto transaction refund', () => (
    <BoletoRefund />
  ))
  .add('Card transaction refund', () => (
    <CreditCardRefund />
  ))
  .add('Balance', () => (
    <Balance />
  ))
  .add('Capture form', () => (
    <CaptureFormExample />
  ))
  .add('Capture form with fixed amount', () => (
    <FixedCaptureFormExample />
  ))
  .add('Capture confirmation', () => (
    <CaptureResult />
  ))
  .add('Capture step identification', () => (
    <Capture
      stepStatus={{
        confirmation: 'pending',
        identification: 'current',
      }}
    />
  ))
  .add('Capture step identification (token)', () => (
    <Capture
      isFromCheckout
      stepStatus={{
        confirmation: 'pending',
        identificaiton: 'current',
      }}
    />
  ))
  .add('Capture step confirmation', () => (
    <Capture
      stepStatus={{
        confirmation: 'current',
        identification: 'success',
      }}
    />
  ))
  .add('Capture step confirmation error', () => (
    <Capture
      stepStatus={{
        confirmation: 'error',
        identification: 'success',
      }}
      statusMessage="An error ocurred!"
    />
  ))
  .add('Reprocess form', () => (
    <ReprocessForm />
  ))
  .add('Reprocess form without antifraud', () => (
    <ReprocessForm
      allowReprocessWithoutAntifraud
    />
  ))
  .add('Reprocess form without antifraud disabled', () => (
    <ReprocessForm
      allowReprocessWithoutAntifraud
      disableWithoutAntifraudReprocess
      lockReason="chargeback_rate"
    />
  ))
  .add('Reprocess confirmation', () => (
    <ReprocessConfirmation />
  ))
  .add('Reprocess confirmation without antifraud', () => (
    <ReprocessConfirmation
      isReprocessingWithoutAntifraud
    />
  ))
  .add('Reprocess result', () => (
    <ReprocessResult />
  ))
  .add('Reprocess result with error', () => (
    <ReprocessResult status="error" />
  ))
  .add('Reprocess step identification', () => (
    <Reprocess
      stepStatus={{
        confirmation: 'pending',
        identification: 'current',
        result: 'pending',
      }}
    />
  ))
  .add('Reprocess step identification without antifraud', () => (
    <Reprocess
      allowReprocessWithoutAntifraud
      stepStatus={{
        confirmation: 'pending',
        identification: 'current',
        result: 'pending',
      }}
    />
  ))
  .add('Reprocess step identification without antifraud disabled', () => (
    <Reprocess
      allowReprocessWithoutAntifraud
      lockReason="chargeback_rate"
      stepStatus={{
        confirmation: 'pending',
        identification: 'current',
        result: 'pending',
      }}
    />
  ))
  .add('Reprocess step confirmation', () => (
    <Reprocess
      allowReprocessWithoutAntifraud
      currentStep="confirmation"
      stepStatus={{
        confirmation: 'current',
        identification: 'success',
        result: 'pending',
      }}
    />
  ))
  .add('Reprocess step result', () => (
    <Reprocess
      allowReprocessWithoutAntifraud
      stepStatus={{
        confirmation: 'success',
        identification: 'success',
        result: 'success',
      }}
    />
  ))
  .add('Reprocess step result error', () => (
    <Reprocess
      allowReprocessWithoutAntifraud
      statusMessage="Internal server error"
      stepStatus={{
        confirmation: 'success',
        identification: 'success',
        result: 'error',
      }}
    />
  ))
  .add('Select Account', () => (
    <SelectAccount />
  ))
  .add('Withdraw', () => (
    <Withdraw />
  ))
  .add('WithdrawConfirmation', () => (
    <WithdrawConfirmation />
  ))
  .add('WithdrawForm', () => (
    <WithdrawForm />
  ))
  .add('Withdraw Result Success', () => (
    <WithdrawResultSuccess />
  ))
  .add('Withdraw Result Error', () => (
    <WithdrawResultError />
  ))
  .add('Anticipation Confirmation with automatic transfer', () => (
    <AnticipationConfirmationWithAutomaticTransfer />
  ))
  .add('Anticipation Confirmation without automatic transfer', () => (
    <AnticipationConfirmationWithoutAutomaticTransfer />
  ))
  .add('Anticipation Confirmation with error', () => (
    <AnticipationConfirmationWithError />
  ))
  .add('Anticipation Confirmation disabled', () => (
    <AnticipationConfirmationDisabled />
  ))
  .add('Anticipation Result with automatic transfer', () => (
    <AnticipationResultWithAutomaticTransfer />
  ))
  .add('Anticipation Result without automatic transfer', () => (
    <AnticipationResultWithoutAutomaticTransfer />
  ))
  .add('Anticipation Result error', () => (
    <AnticipationResultError />
  ))
  .add('Anticipation', () => (
    <Anticipation />
  ))
  .add('Bank Account Form', () => (
    <BankAccountForm />
  ))
  .add('Home', () => (
    <Home />
  ))

storiesOf('Containers|Payment Links/Filter', module)
  .add('Filter', () => <PaymentLinks.Filter />)

storiesOf('Containers|Payment Links/NewLinksCard', module)
  .add('NewLinksCard', () => <PaymentLinks.NewLinksCard />)

storiesOf('Containers|Payment Links/PaymentLinkList', module)
  .add('List', () => <PaymentLinks.PaymentLinksList.WithList />)
  .add('List exporting', () => <PaymentLinks.PaymentLinksList.WithListExporting />)
  .add('List loading', () => <PaymentLinks.PaymentLinksList.WithListLoading />)
  .add('Empty list', () => <PaymentLinks.PaymentLinksList.WithEmptyList />)

storiesOf('Containers|Payment Links/PaymentLinkAdd', module)
  .add('FirstStep', () => <PaymentLinks.PaymentLinkAdd.PaymentLinkFirstStep />)
  .add('Result', () => <PaymentLinks.PaymentLinkAdd.PaymentLinkResult />)

storiesOf('Containers|Payment Links/Details/LinkStatement', module)
  .add('Default', () => <PaymentLinks.Details.LinkStatement.LinkStatementDefault />)
  .add('EmptyState', () => <PaymentLinks.Details.LinkStatement.LinkStatementEmptyState />)
  .add('OptionalFields', () => <PaymentLinks.Details.LinkStatement.LinkStatementOptionalFields />)

storiesOf('Containers|Empty State', module)
  .add('Default', () => <EmptyState.EmptyStateDefault />)
  .add('MDRzao', () => <EmptyState.EmptyStateMDRzao />)
