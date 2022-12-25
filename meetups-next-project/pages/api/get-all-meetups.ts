import { MongoClient } from "mongodb";

const handler = async (req: any, res: any) => {
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://nextJsPractice:nextJsPractice34@cluster0.h3k9eua.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.find().toArray();
    console.log(result);

    res.status(200);
  }
};

export default handler;
