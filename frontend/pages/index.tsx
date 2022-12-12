import HomeBrowser from "src/pages/Home/browser";
import HomeDesktop from "src/pages/Home/desktop";
import LoadingPage from "src/pages/Home/Loading";
import usePlatform from "src/utils/usePlatform";
import HomeMobile from "src/pages/Home/mobile";
import Head from 'next/head'

const Home = () => {
  const {platform} = usePlatform();

  switch (platform) {
    case "mobile":
      return (
        <HomeMobile>
          <Head>
            <title>Ollamy</title>
            <meta name="description" content="EIP Project"/>
            <link rel="icon" href="/favicon.ico"/>
          </Head>
        </HomeMobile>
      );
    case "desktop":
      return (
        <HomeDesktop>
          <Head>
            <title>Ollamy</title>
            <meta name="description" content="EIP Project"/>
            <link rel="icon" href="/favicon.ico"/>
          </Head>
        </HomeDesktop>
      );
    case "browser":
      return (
        <HomeBrowser>
          <Head>
            <title>Ollamy</title>
            <meta name="description" content="EIP Project"/>
            <link rel="icon" href="/favicon.ico"/>
          </Head>
        </HomeBrowser>
      );
    default:
      return (
        <LoadingPage />
      )
  }
};

export default Home;
