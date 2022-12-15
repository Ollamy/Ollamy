import MakerBrowser from "src/pages/Maker/browser";
import LoadingPage from "src/pages/Home/Loading";
import usePlatform from "src/utils/usePlatform";
import Head from 'next/head'

const Maker = () => {
  const {platform} = usePlatform();

  switch (platform) {
    case "mobile":
      return (
        null
      );
    case "desktop":
      return (
        null
      );
    case "browser":
      return (
        <MakerBrowser>
          <Head>
            <title>Ollamy Maker</title>
            <meta name="description" content="EIP Project"/>
            <link rel="icon" href="/favicon.ico"/>
          </Head>
        </MakerBrowser>
      );
    default:
      return (
        <LoadingPage />
      )
  }
};

export default Maker;
