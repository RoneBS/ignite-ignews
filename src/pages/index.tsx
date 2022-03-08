import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import * as S from './home.styles'

type HomeProps = {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <S.HomeMain>
        <S.HomeSection>
          <span>👋 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount}</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </S.HomeSection>
        <S.HomeImg src="/images/avatar.svg" alt="Girl coding" />
      </S.HomeMain>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IYrEhGcpL3l7Uuby89spDa2')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  }
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
