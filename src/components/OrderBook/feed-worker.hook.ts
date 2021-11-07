import { useState, useEffect, useRef } from 'react'
import { OrderRowState } from '@/types/order.type'

export type Status = 'loading' | 'ready' | 'killed' | 'error'

export interface UseFeedWorker {
  status: Status
  feed: Worker | null
  orderBook: OrderRowState | undefined
}

export const useFeedWorker = (): UseFeedWorker => {
  const [status, setStatus] = useState('loading')
  const [orderBook, setOrderBook] = useState<OrderRowState>()

  const worker = useRef<Worker>()

  useEffect(() => {
    (async () => {
      worker.current = new Worker(
        new URL('@/workers/feed.worker', import.meta.url)
      )

      worker.current.onmessage = (event) => {
        switch (event.data.type) {
          case 'SNAPSHOT': {
            const orderBookSnapshot: OrderRowState = event.data.data
            setOrderBook(Object.freeze(orderBookSnapshot))
            break
          }
          case 'ORDER': {
            const orderBookSnapshot: OrderRowState = event.data.data
            setOrderBook(Object.freeze(orderBookSnapshot))
            break
          }
          case 'FEED_KILLED':
            worker.current?.terminate()
            break
        }
      }

      setStatus('ready')
    })()
  }, [])

  if (worker && worker?.current && status === 'ready') {
    return {
      status: 'ready',
      feed: worker.current,
      orderBook,
    }
  }

  return {
    status: 'loading',
    feed: null,
    orderBook,
  }
}
