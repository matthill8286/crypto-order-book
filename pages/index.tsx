import Head from 'next/head'
import { saiyanTheme } from 'saiyan-component-library'
import OrderBook from '@/components/OrderBook'
import { ThemeProvider } from 'styled-components'

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
