import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
const MeetUpPage = (props: any) => {
  const { meetupData } = props;
  const { id, title, address, description, image } = meetupData;
  console.log(meetupData);
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <MeetupDetail
        id={id}
        image={image}
        title={title}
        description={description}
        address={address}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://nextJsPractice:nextJsPractice34@cluster0.h3k9eua.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const result = await meetupsCollection.find().toArray();
  client.close();

  return {
    fallback: false,
    paths: result.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context: any) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://nextJsPractice:nextJsPractice34@cluster0.h3k9eua.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup?._id.toString(),
        title: selectedMeetup?.title,
        description: selectedMeetup?.description,
        image: selectedMeetup?.image,
      },
    },
  };
};

export default MeetUpPage;
