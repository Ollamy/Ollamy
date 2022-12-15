import LessonMobile from "src/pages/Lesson/mobile";
import Head from 'next/head';
import { useRouter } from 'next/router'

const Lesson = (): JSX.Element => {
  const router = useRouter()
  const { id } = router.query
  console.log('>', id)
  return (
    <LessonMobile>
      <Head>
        <title>Ollamy</title>
        <meta name="description" content="EIP Project"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
    </LessonMobile>
  );
};

export default Lesson;