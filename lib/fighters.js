import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.26zhx4l.mongodb.net/${process.env.DB_NAME}`;

const client = new MongoClient(uri);

let db;

export async function connectToDatabase() {
  if (!db) {
    try {
      await client.connect();
      db = client.db("ufc-news");
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      process.exit(1);
    }
  }
  return db;
}
