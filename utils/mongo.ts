import { InsertOneResult, MongoClient } from "mongodb";
import { resourceUsage } from "process";

//const { MongoClient } = require("mongodb");

const mongoConnection = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_DB}/store-${process.env.STORE_ENVIRONMENT}?retryWrites=true&w=majority`;

const connectToMongo = async (): Promise<MongoClient> => {
  const client = await MongoClient.connect(mongoConnection);
  return client;
};

const insertOne = async (
  collection: string,
  document: Object
): Promise<InsertOneResult<Document>> => {
  const client = await connectToMongo();
  const db = client.db();
  const insertResult = await db.collection(collection).insertOne(document);
  client.close();
  return insertResult;
};

const getCollection = async (collection: string, filter: any, sort: any) => {
  const client = await connectToMongo();
  const db = client.db();
  const result = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  client.close();
  return result;
};

export { insertOne, getCollection };
