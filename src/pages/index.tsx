import Image from 'next/image';
import Head  from 'next/head';
import { GetStaticProps } from 'next';

import GirlCoding from '../../public/images/avatar.svg';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss'
import { privateDecrypt } from 'crypto';

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <Image src={GirlCoding} alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  /* Formas de se fazer chamadas a API:
    Client-side
      - Sem indexação
      - Carregamento depois de servir a página
    Server-side
      - Com indexação
      - Carregamento antes de servir a página
      - Server-Side-Rendering (getServerProps) - Dinâmico - Realiza o processo repetidas vezes;
    Static Site Generátion
      - Com indexação
      - Carregamento antes de servir a página
      - staticSideProps (getStaticProps): Statico para todos os clientes - Possui o revalidate;
  */
  const price = await stripe.prices.retrieve('price_1K8ZjVCKhUtM2Q1nr2Akzobi', {
    expand: ['product']
  });

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