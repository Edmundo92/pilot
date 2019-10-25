const query = ({ end, start }) => ({
  filter: {
    range: {
      date_created: {
        lte: end,
        gte: start,
      },
    },
  },
  aggs: {
    weekdayVolume: {
      filter: {
        range: {
          date_created: {
            lte: end,
            gte: start,
          },
        },
      },
      aggs: {
        weekdays: {
          date_histogram: {
            field: 'date_created',
            interval: 'day',
          },
          aggs: {
            volume: {
              sum: {
                field: 'amount',
              },
            },
          },
        },
      },
    },
    metrics: {
      date_range: {
        field: 'date_created',
        ranges: [
          {
            from: start,
            to: end,
          },
        ],
      },
      aggs: {
        paidTransactions: {
          terms: {
            field: 'status',
            include: ['paid', 'pending_refund', 'refunded', 'chargedback'],
          },
          aggs: {
            volume: {
              sum: {
                field: 'amount',
              },
            },
          },
        },
        payment_method: {
          terms: {
            field: 'payment_method',
          },
        },
        card_brand: {
          terms: {
            field: 'card_brand',
          },
        },
        status: {
          terms: {
            field: 'status',
          },
        },
        refuse_reason: {
          terms: {
            field: 'refuse_reason',
          },
        },
        installments: {
          terms: {
            field: 'installments',
          },
        },
      },
    },
  },
})

export default query
