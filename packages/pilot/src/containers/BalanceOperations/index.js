import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { map } from 'ramda'
import {
  Button,
  CardContent,
  DateInput,
  isMomentPropValidation,
  Spacing,
} from 'former-kit'
import IconCalendar from 'emblematic-icons/svg/Calendar32.svg'

import BalanceSummary from '../../components/BalanceSummary'
import Operations from '../../components/Operations'
import dateLimits, { isValidDay } from '../../models/dateSelectorLimits'
import getColumns from '../../components/Operations/operationsTableColumns'
import getColumnsTranslator from '../../formatters/columnTranslator'
import operationsTypesLabels from '../../models/operationTypes'
import style from './style.css'

const getDateLabels = t => ({
  anyDate: t('dates.any'),
  cancel: t('dates.cancel'),
  confirmPeriod: t('dates.confirm'),
  custom: t('dates.custom'),
  day: t('dates.day'),
  daySelected: t('dates.day_selected'),
  daysSelected: t('dates.selected'),
  end: t('dates.end'),
  noDayOrPeriodSelected: t('dates.no_selected'),
  period: t('dates.period'),
  select: t('dates.select'),
  start: t('dates.start'),
  today: t('dates.today'),
})

const BalanceOperations = ({
  amount,
  currentPage,
  dates,
  disabled,
  exporting,
  hasNextPage,
  isFilterActive,
  itemsPerPage,
  loading,
  onDateChange,
  onDatePresetChange,
  onExport,
  onFilterClick,
  onPageChange,
  onPageCountChange,
  operations,
  pageSizeOptions,
  presets,
  selectedPreset,
  showDateInputCalendar,
  t,
  timeframe,
}) => {
  const translateColumns = getColumnsTranslator(t)
  const typesLabels = map(t, operationsTypesLabels)

  const totalPages = hasNextPage
    ? currentPage + 1
    : currentPage

  return (
    <Fragment>
      <CardContent className={style.filter}>
        <DateInput
          active={isFilterActive}
          disabled={disabled || loading}
          icon={<IconCalendar width={16} height={16} />}
          isValidDay={isValidDay(timeframe)}
          limits={dateLimits}
          onChange={onDateChange}
          onPresetChange={onDatePresetChange}
          presets={presets}
          selectedPreset={selectedPreset}
          strings={getDateLabels(t)}
          showCalendar={showDateInputCalendar}
          dates={dates}
        />
        <Spacing size="tiny" />
        <Button
          disabled={disabled || isFilterActive}
          fill="gradient"
          onClick={onFilterClick}
          size="default"
        >
          {t('filter_action')}
        </Button>
      </CardContent>
      <BalanceSummary
        amount={amount}
        loading={loading}
        t={t}
      />
      <Operations
        columns={translateColumns(getColumns(typesLabels))}
        count={operations.total}
        currentPage={currentPage}
        dates={dates}
        disabled={disabled}
        exporting={exporting}
        itemsPerPage={itemsPerPage}
        labels={{
          empty: t('models.operations.empty_message'),
          exportCall: t('export_table'),
          exportTo: t('export_to'),
          results: t(
            'pages.balance.results',
            { count: operations.total }
          ),
          totalOf: t('pages.balance.total.of'),
        }}
        loading={disabled || loading}
        onExport={timeframe !== 'future'
          ? onExport
          : null
        }
        onPageChange={onPageChange}
        onPageCountChange={onPageCountChange}
        pageSizeOptions={pageSizeOptions.map(i => ({
          name: t('items_per_page', { count: i }),
          value: `${i}`,
        }))}
        rows={operations.rows}
        totalPages={totalPages}
      />
    </Fragment>
  )
}

BalanceOperations.propTypes = {
  amount: PropTypes.shape({
    net: PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.number,
    }),
    outcoming: PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.number,
    }),
    outgoing: PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.number,
    }),
  }),
  currentPage: PropTypes.number.isRequired,
  dates: PropTypes.shape({
    end: isMomentPropValidation,
    start: isMomentPropValidation,
  }).isRequired,
  disabled: PropTypes.bool,
  exporting: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  isFilterActive: PropTypes.bool,
  itemsPerPage: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onDateChange: PropTypes.func.isRequired,
  onDatePresetChange: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  onFilterClick: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageCountChange: PropTypes.func.isRequired,
  operations: PropTypes.shape({
    count: PropTypes.number.isRequired,
    rows: PropTypes.array.isRequired,
    total: PropTypes.number,
  }).isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  presets: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.func,
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    mode: PropTypes.string,
  })).isRequired,
  selectedPreset: PropTypes.string.isRequired,
  showDateInputCalendar: PropTypes.bool,
  t: PropTypes.func.isRequired,
  timeframe: PropTypes.string,
}

BalanceOperations.defaultProps = {
  amount: null,
  disabled: false,
  exporting: false,
  hasNextPage: false,
  isFilterActive: true,
  loading: false,
  showDateInputCalendar: false,
  timeframe: 'past',
}

export default BalanceOperations
