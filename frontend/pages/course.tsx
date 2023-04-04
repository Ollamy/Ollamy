import CourseMobile from "src/pages/Course/mobile";
import Head from 'next/head';

const Course = (): JSX.Element => {
  return (
    <CourseMobile>
      <Head>
        <title>Ollamy</title>
        <meta name="description" content="EIP Project"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
    </CourseMobile>
  );
};

export default Course;