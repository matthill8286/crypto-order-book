import Head from 'next/head'
import React, { ReactElement, ReactNode } from 'react'
import { Cell, Grid, Row, saiyanTheme, ThemeProvider } from '../src/libs'
import OrderBook from '../src/components/OrderBook'

export const Home = (): ReactElement | ReactNode => (
  <div className='container'>
    <Head>
      <title>Order book for personal usa</title>
      <link rel='icon' href='/public/favicon.ico' />
    </Head>

    <ThemeProvider theme={saiyanTheme}>
      <Grid>
        <Row>
          <Cell columns={12}>
            <OrderBook />
          </Cell>
        </Row>
      </Grid>
    </ThemeProvider>
  </div>
)

export default Home
