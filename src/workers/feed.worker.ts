import {
  CryptoFacilitiesWSSnapshot,
  GranularOrderDelta,
  OrderDelta,
  OrderDeltaWithTimestamp, OrderRowHash,
  OrderRowState,
  SourceOrderBook,
  TickerShape
} from '../types/order.type'
import {
  getDecimalPlace,
  groupTickRows,
  refreshOrderBookState,
} from '../api/orderbook-group/orderbook-group.api'

class OrderBookSocketFeed {
  private websocket: WebSocket
  private ticker: string
  private tickSize: number
  private sourceOrderBook: SourceOrderBook<OrderDeltaWithTimestamp>
  private orderBookState: OrderRowState<OrderRowHash>
  private lastAnnouncedTime: Date
  private announcementIntervalMs = 250

  constructor(
    endpoint = 'wss://www.cryptofacilities.com/ws/v1',
    ticker: TickerShape = { ticker: 'PI_XBTUSD', tickSize: 0.5 }
  ) {
    this.ticker = ticker.ticker
    this.tickSize = ticker.tickSize

    const wss: WebSocket = new WebSocket(endpoint)

    wss.onopen = () => {
      const subscription = {
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: [ticker.ticker],
      }

      this.websocket.send(JSON.stringify(subscription))
    }

    wss.onmessage = (event: MessageEvent) => {
      const data: CryptoFacilitiesWSSnapshot<OrderDelta> = JSON.parse(event.data)
      const decimalPlace = getDecimalPlace(this.tickSize)

      switch (data.feed) {
        case 'book_ui_1_snapshot': {
          const dateStamp = new Date()
          this.lastAnnouncedTime = dateStamp

          this.sourceOrderBook = {
            ...data,
            asks: this.mapDeltaArrayToHash(data.asks, dateStamp, decimalPlace),
            bids: this.mapDeltaArrayToHash(data.bids, dateStamp, decimalPlace),
          }

          const orderBookSnapshot = this.groupByTickSize({
            asks: data.asks,
            bids: data.bids,
            ticker: this.ticker,
            tickSize: this.tickSize,
            dateStamp,
            decimalPlace,
          })

          this.orderBookState = orderBookSnapshot

          postMessage({
            type: 'SNAPSHOT',
            data: orderBookSnapshot,
          })

          break
        }
        case 'book_ui_1': {
          this.updateDelta(data)
          break
        }
      }
    }

    wss.onclose = () => {
      this.websocket.close()
    }

    wss.onerror = (error) => {
      this.websocket.close()
      throw error
    }

    this.websocket = wss
  }

  toggleFeed(ticker: TickerShape): void {
    const unsubscribe = {
      event: 'unsubscribe',
      feed: 'book_ui_1',
      product_ids: [this.ticker],
    }

    this.websocket.send(JSON.stringify(unsubscribe))

    this.clearState()

    const subscription = {
      event: 'subscribe',
      feed: 'book_ui_1',
      product_ids: [ticker.ticker],
    }

    this.websocket.send(JSON.stringify(subscription))

    this.ticker = ticker.ticker

    this.tickSize = ticker.tickSize
  }

  openFeed(ticker: TickerShape): void {

    const subscription = {
      event: 'subscribe',
      feed: 'book_ui_1',
      product_ids: [ticker.ticker],
    }

    this.clearState()

    this.websocket.send(JSON.stringify(subscription))

    this.ticker = ticker.ticker

    this.tickSize = ticker.tickSize

  }

  changeTickSize(tickSize: number): void {
    const nextOrderBookState = refreshOrderBookState(
      tickSize,
      this.orderBookState
    )

    this.orderBookState = nextOrderBookState

    this.tickSize = tickSize

    postMessage({
      type: 'SNAPSHOT',
      data: nextOrderBookState,
    })
  }

  closeFeed(): void {
    try {
      const unsubscribe = {
        event: 'unsubscribe',
        feed: 'book_ui_1',
        product_ids: [this.ticker],
      }

      this.websocket.send(JSON.stringify(unsubscribe))

      postMessage({
        type: 'FEED_KILLED',
        data: this.ticker,
      })

    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Caught error', e)
      throw e
    }
  }

  private mapDeltaArrayToHash(
    deltaArray: OrderDelta[],
    dateStamp: Date,
    decimalPlace: number
  ): {
    [key: number]: OrderDeltaWithTimestamp
  } {
    return deltaArray.slice(0, 20).reduce(
      (acc: { [key: number]: OrderDeltaWithTimestamp }, curr) => {
        const [price, size] = curr
        acc[price] = {
          price: price.toFixed(decimalPlace),
          size,
          date: dateStamp,
        }
        return acc
      },
      {}
    )
  }

  private updateDelta(orderDelta: GranularOrderDelta<OrderDelta>): void {
    const currentDateStamp = new Date()
    if (!orderDelta.asks || !orderDelta.bids) {
      return
    }

    const decimalPlace = getDecimalPlace(this.tickSize)

    if (orderDelta.asks) {
      orderDelta.asks.forEach((delta: OrderDelta) => {
        const [price, size] = delta
        const prevPriceSnap = this.sourceOrderBook.asks[price]
        if (!prevPriceSnap && size) {
          this.sourceOrderBook.asks[price] = {
            price: price.toFixed(decimalPlace),
            size,
            date: currentDateStamp,
          }
        }

        if (prevPriceSnap && prevPriceSnap.date < currentDateStamp) {
          if (size === 0) {
            delete this.sourceOrderBook.asks[price]
          } else {
            this.sourceOrderBook.asks[price] = {
              price: price.toFixed(decimalPlace),
              size,
              date: currentDateStamp,
            }
          }
        }
      })
    }

    if (orderDelta.bids) {
      orderDelta.bids.forEach((delta: OrderDelta) => {
        const [price, size] = delta

        const prevPriceSnap = this.sourceOrderBook.bids[price]

        if (!prevPriceSnap && size) {
          this.sourceOrderBook.bids[price] = {
            price: price.toFixed(decimalPlace),
            size,
            date: currentDateStamp,
          }
        }

        if (prevPriceSnap && prevPriceSnap.date < currentDateStamp) {
          if (size === 0) {
            delete this.sourceOrderBook.bids[price]
          } else {
            this.sourceOrderBook.bids[price] = {
              price: price.toFixed(decimalPlace),
              size,
              date: currentDateStamp,
            }
          }
        }
      })
    }

    const orderBookSnapshot: OrderRowState<OrderRowHash> = this.groupByTickSize({
      asks: Object.keys(this.sourceOrderBook.asks).map((key) => {
        const { price, size } = this.sourceOrderBook.asks[parseFloat(key)]
        return [parseFloat(price), size]
      }),
      bids: Object.keys(this.sourceOrderBook.bids).map((key) => {
        const { price, size } = this.sourceOrderBook.bids[parseFloat(key)]
        return [parseFloat(price), size]
      }),
      ticker: this.ticker,
      tickSize: this.tickSize,
      dateStamp: currentDateStamp,
      decimalPlace: getDecimalPlace(this.tickSize),
    })

    const lastAnnouncedTimeMs: number = this.lastAnnouncedTime.getTime()

    const allowedNextAnnoucement: Date = new Date(
      lastAnnouncedTimeMs + this.announcementIntervalMs
    )

    if (currentDateStamp > allowedNextAnnoucement) {
      this.lastAnnouncedTime = currentDateStamp
      this.orderBookState = orderBookSnapshot

      postMessage({
        type: 'ORDER',
        data: orderBookSnapshot,
      })
    }
  }

  private clearState(): void {
    const emptySourceOrderBook: OrderBookSocketFeed['sourceOrderBook'] = {
      product_id: '',
      numLevels: 0,
      feed: '',
      asks: {},
      bids: {},
    }

    const emptyOrderBookState: OrderBookSocketFeed['orderBookState'] = {
      ticker: '',
      asks: [],
      bids: [],
      maxPriceSize: 0,
    }

    this.sourceOrderBook = emptySourceOrderBook
    this.orderBookState = emptyOrderBookState
  }

  private groupByTickSize({
    bids,
    asks,
    ticker,
    tickSize,
    dateStamp,
    decimalPlace,
  }: {
    bids: OrderDelta[]
    asks: OrderDelta[]
    ticker: string
    tickSize: number
    dateStamp: Date
    decimalPlace: number
  }) {
    const newMaxPriceSize = asks
      .concat(bids)
      .filter((d) => d[1])
      .map((d) => d[1])
      .reduce((acc, curr) => acc + curr, 0)

    const orderBookSnapshot: OrderRowState<OrderRowHash> = {
      ticker,
      asks: groupTickRows(
        tickSize,
        this.mapDeltaArrayToHash(asks, dateStamp, decimalPlace)
      ),
      bids: groupTickRows(
        tickSize,
        this.mapDeltaArrayToHash(bids, dateStamp, decimalPlace)
      ),
      maxPriceSize: newMaxPriceSize,
    }
    return orderBookSnapshot
  }
}

const feed: OrderBookSocketFeed = new OrderBookSocketFeed()

onmessage = (event: MessageEvent<any>) => {
  switch (event.data.type) {
    case 'TOGGLE_FEED': {
      feed.toggleFeed(event.data.ticker)
      break
    }
    case 'CHANGE_TICK_SIZE': {
      feed.changeTickSize(event.data.tickSize)
      break
    }
    case 'KILL_FEED': {
      feed.closeFeed()
      break
    }
    case 'REOPEN_FEED': {
      feed.openFeed(event.data.ticker)
      break
    }
    default: {
      // eslint-disable-next-line no-console
      console.log('Instructions not specific enough')
    }
  }
}

export default {}
