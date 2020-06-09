import React from 'react'
import { path, split } from 'ramda'
import Section from '../../../../Section'
import translations from '../../../../../public/locales/pt/translations.json'
import LinkStatement from '../../../../../src/containers/PaymentLinks/Details/LinkStatement'

const t = (sentence = '') => path(split('.', sentence), translations)

const LinkStatementDefaultExample = () => (
  <Section>
    <LinkStatement
      fees={300}
      netAmount={2700}
      paidAmount={3000}
      t={t}
    />
  </Section>
)

const LinkStatementOptionalFieldsExample = () => (
  <Section>
    <LinkStatement
      chargebacks={100}
      fees={50}
      netAmount={2650}
      paidAmount={3000}
      refunds={200}
      t={t}
    />
  </Section>
)

export default {
  LinkStatementDefault: LinkStatementDefaultExample,
  LinkStatementOptionalFields: LinkStatementOptionalFieldsExample,
}
