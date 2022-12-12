import HomeComponent from "src/pages/Home";
import Head from 'next/head'

const Home = () => {
  return (
    <HomeComponent>
      <Head>
        <title>Ollamy</title>
        <meta name="description" content="EIP Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </HomeComponent>
  )
};

export default Home;
