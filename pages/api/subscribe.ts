import { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient, Db } from "mongodb";
import url from "url";

interface SubscribeRequest extends VercelRequest {
  body: {
    email: string;
  };
}

let cachedDatabase: Db | null = null;

async function connectToDatabase(uri: string){
  if (cachedDatabase) return cachedDatabase;

  const client = new MongoClient(uri);

  const dbName = url.parse(uri).pathname?.substring(1);

  const database = await client.connect().then(client => client.db(dbName));

  cachedDatabase = await database;

  return database

}

export default async function (request: SubscribeRequest, response: VercelResponse) {

  const { email } = request.body;

  const database = await connectToDatabase(process.env.MOGOBD_URL??"");
  const collection = database.collection("subscribers");

  const existingSubscriber = await collection.findOne({ email });

  if (existingSubscriber) return response.status(400).json({ error: "Already subscribed" });

  await collection.insertOne({
    email,
    subscribedAt: new Date()
  });

  return response.status(201).json({
    message: "Subscribed"
  });
}