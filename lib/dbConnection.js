import { MongoClient } from "mongodb";

// Connection string to the MongoDB database using environment variables.
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.26zhx4l.mongodb.net/${process.env.DB_NAME}`;

// Create a new MongoClient instance.
const client = new MongoClient(uri);

// Variable to hold the database connection.
let db;

// Function to connect to the database.
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
