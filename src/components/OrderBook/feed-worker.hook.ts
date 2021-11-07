import { useState, useEffect, useRef, SetStateAction, Dispatch, MutableRefObject } from 'react'
import { OrderRowHash, OrderRowState, UseFeedWorker } from '@/types/order.type'

export const useFeedWorker = (): UseFeedWorker => {
  const [status, setStatus]: [string, Dispatch<SetStateAction<string>>] = useState('loading')
  const [orderBook, setOrderBook]: [OrderRowState<OrderRowHash>, Dispatch<SetStateAction<OrderRowState<OrderRowHash>>>] = useState<OrderRowState<OrderRowHash>>()

  const worker: MutableRefObject<Worker> = useRef<Worker>()

  useEffect(() => {
    (async () => {
      worker.current = new Worker(
        new URL('@/workers/feed.worker', import.meta.url)
      )

      worker.current.onmessage = (event) => {
        switch (event.data.type) {
          case 'SNAPSHOT': {
            const orderBookSnapshot: OrderRowState<OrderRowHash> = event.data.data
            setOrderBook(Object.freeze(orderBookSnapshot))
            break
          }
          case 'ORDER': {
            const orderBookSnapshot: OrderRowState<OrderRowHash> = event.data.data
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
      orderBook
    }
  }

  return {
    status: 'loading',
    feed: null,
    orderBook
  }
}
