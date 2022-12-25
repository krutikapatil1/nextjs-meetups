import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const MainPage = (props: any) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="A List of all amazing React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />; ;
    </Fragment>
  );
};

// export const getServerSideProps = async (context: any) => {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://nextJsPractice:nextJsPractice34@cluster0.h3k9eua.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const result = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: result.map((meetupObj) => ({
        id: meetupObj._id.toString(),
        title: meetupObj.title,
        address: meetupObj.address,
        image: meetupObj.image,
      })),
    },
    revalidate: 10,
  };
};

export default MainPage;
