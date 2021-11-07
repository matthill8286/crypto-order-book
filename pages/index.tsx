import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'
import { saiyanTheme, ThemeProvider } from '@matthill8286/atomic-ui'
import OrderBook from '@/components/OrderBook'

export const Home = (): ReactElement | ReactNode => (
  <div className='container'>
    <Head>
      <title>Order book for personal usa</title>
      <link rel='icon' href='/public/favicon.ico' />
    </Head>

    <ThemeProvider theme={saiyanTheme}>
      <OrderBook />
    </ThemeProvider>
  </div>
)

export default Home
