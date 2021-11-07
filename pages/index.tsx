import Head from 'next/head'
import { saiyanTheme, ThemeProvider } from '@matthill8286/atomic-ui'
import OrderBook from '@/components/OrderBook'

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ThemeProvider theme={saiyanTheme}>
      <OrderBook />
    </ThemeProvider>
  </div>
)

export default Home
