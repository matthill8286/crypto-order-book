export interface TickerShape {
  ticker: string
  tickSize: number
}

export interface TickerInternalState extends TickerShape {
  tickSizes?: number[]
}

export type TickerState = {
  [tickerName: string]: {
    tickSize: number;
    ticker: string;
    tickSizes: number[]
  }
}


export type OrderMeta = {
  price: PriceDisplay
  size: Size
  total?: Price
}

export interface OrderRowWithoutTotal extends OrderMeta{
  date?: Date
}

type PriceDisplay = string
type Price = number
type Size = number

export type OrderDelta = [Price, Size]

export type OrderDeltaWithTimestamp = {
  price: PriceDisplay
  size: Size
  date: Date
}

export type CryptoFacilitiesWSSnapshot<T> = {
  product_id: string
  numLevels: number
  feed: string
  bids: T[]
  asks: T[]
}

export interface OrderRowHash {
  [key: number]: OrderMeta
}

export type OrderRowState<T> = {
  ticker: string
  asks: T
  bids: T
  maxPriceSize: number
}

export interface SourceOrderBook<T> {
  product_id: string
  numLevels: number
  feed: string
  asks: { [key: number]: T }
  bids: { [key: number]: T }
}

export interface GranularOrderDelta<T> {
  product_id: string
  feed: string
  asks: T[]
  bids: T[]
}

export type Status = 'loading' | 'ready' | 'killed' | 'error'

export interface UseFeedWorker {
  status: Status
  feed: Worker | null
  orderBook: OrderRowState<OrderRowHash> | undefined
}
