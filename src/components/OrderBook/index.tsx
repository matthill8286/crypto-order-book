import React, { useState, useMemo, ReactElement } from 'react'
import { keys, min, max } from 'lodash'
import { css } from '@emotion/css'
import { useFeedWorker } from './feed-worker.hook'
import {
  breakpoints,
  CopyText,
  FlexBox,
  FlexItem,
  media,
  OrderBookTable,
  styled,
  useWindowDimensions,
  Heading
} from '@matthill8286/atomic-ui'

const StyledTableWrapper = styled(FlexBox)`
  flex: 1;

  ${media.sm} {
    flex-direction: row;
  }
`

const feedTickerOptions = {
  PI_XBTUSD: {
    tickSize: 0.5,
    tickSizes: [0.5, 1, 2.5],
    ticker: 'PI_XBTUSD'
  },
  PI_ETHUSD: {
    tickSize: 0.05,
    tickSizes: [0.05, 0.1, 0.25],
    ticker: 'PI_ETHUSD'
  }
}

const OrderBook = (): ReactElement | null => {
  const { status, feed, orderBook } = useFeedWorker()
  const { breakpoint: currentBreakpoint } = useWindowDimensions()
  const isMobile = currentBreakpoint < breakpoints.md

  const [product, setProduct] = useState(feedTickerOptions.PI_ETHUSD.ticker)

  const [groupOptions, setGroupOptions] = useState(
    feedTickerOptions.PI_ETHUSD.tickSizes
  )

  const [tickSize, setTickSize] = useState(
    feedTickerOptions.PI_ETHUSD.tickSize
  )

  const spread = useMemo(() => {
    const lastAskPrice = Number(min(keys(orderBook?.asks)))
    const firstBidPrice = Number(max(keys(orderBook?.bids)))

    return (lastAskPrice - firstBidPrice).toFixed(1)
  }, [orderBook?.asks, orderBook?.bids])

  if (!orderBook) {
    return null
  }

  if (status === 'loading') {
    return <CopyText color="white" textAlign="center">Feed Connection Loading...</CopyText>
  }

  const toggleFeed = () => {
    const nextToggleState =
      orderBook?.ticker === feedTickerOptions.PI_ETHUSD.ticker
        ? feedTickerOptions.PI_XBTUSD
        : feedTickerOptions.PI_ETHUSD

    setTickSize(nextToggleState.tickSize)
    setGroupOptions(nextToggleState.tickSizes)
    setProduct(nextToggleState.ticker)

    feed?.postMessage({ type: 'TOGGLE_FEED', ticker: nextToggleState })
  }

  const killFeed = () => {
    const nextToggleState =
      orderBook?.ticker === feedTickerOptions.PI_ETHUSD.ticker
        ? feedTickerOptions.PI_XBTUSD
        : feedTickerOptions.PI_ETHUSD

    feed?.postMessage({
      type: 'KILL_FEED',
      data: nextToggleState
    })
  }

  const changeTickSize = (nativeEvent: React.BaseSyntheticEvent) => {

    const nextTickSize = nativeEvent.target.value

    setTickSize(nextTickSize)

    feed?.postMessage({
      type: 'CHANGE_TICK_SIZE',
      tickSize: nextTickSize
    })
  }

  return (
    <section style={{ minHeight: '800px' }}>
      <StyledTableWrapper flexDirection='row'>
        <div className={styles.topbar}>
          <Heading scale="level-4" weight="bold" color="white">{product}</Heading>
          {!isMobile && <CopyText color="white">Spread {spread}</CopyText>}
          <select
            name='tickSize'
            id='tickSize'
            value={tickSize}
            className={styles.selectDropdown}
            onChange={(e) => {
              changeTickSize(
                e.nativeEvent as unknown as React.BaseSyntheticEvent
              )
            }}
          >
            {groupOptions.map((tickSize) => {
              return (
                <option key={tickSize} value={tickSize}>
                  Group {tickSize}
                </option>
              )
            })}
          </select>
        </div>
      </StyledTableWrapper>
      <StyledTableWrapper flexDirection='column'>
        <FlexItem flex='1'>
          <OrderBookTable
            rows={orderBook.asks}
            rowsKey='ask'
            maxPriceSize={orderBook.maxPriceSize}
            textColor='error'
            headerTextColor='white'
            isReversed
            backgroundColor='secondary'
            isOutlineRequired={false}
          />
        </FlexItem>
        {isMobile && (<CopyText display="flex" alignText='center' color='grey3'>{spread}</CopyText>)}
        <FlexItem flex='1'>
          <OrderBookTable
            rows={orderBook.bids}
            rowsKey='bid'
            backgroundColor='secondary'
            headerTextColor='white'
            textColor='info'
            hideOnMobile={isMobile}
            maxPriceSize={orderBook.maxPriceSize}
            isOutlineRequired={false}
          />
        </FlexItem>
      </StyledTableWrapper>
      <div className={styles.bottomBar}>
        <button className={styles.buttonPurple} onClick={toggleFeed}>
          Toggle Feed
        </button>
        <button className={styles.buttonRed} onClick={killFeed}>
          Kill Feed
        </button>
      </div>
    </section>
  )
}

const styles = {
  container: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
  `,
  topbar: css`
    display: inline-flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    padding: 0px 20px;  
    align-items: center;
    background-color: #0b1f38;
  `,
  selectDropdown: css`
    width: 100px;
    height: 30px;
  `,
  bottomBar: css`
    background-color: rgb(35 54 69);
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 10vh;
    max-height: 100px;
  `,
  buttonRed: css`
    background-color: red;
    color: white;
    margin: 0px 20px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  `,
  buttonPurple: css`
    background-color: purple;
    color: white;
    margin: 0px 20px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  `
}

export default OrderBook
