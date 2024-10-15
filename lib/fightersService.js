import { connectToDatabase } from "./dbConnection";

// Fetches all fighter documents from the database.
export async function getAllFighters() {
  const db = await connectToDatabase();
  return db.collection("fighters").find().toArray();
}

// Fetches a single fighter document based on the provided slug.
export async function getFighterBySlug(slug) {
  const db = await connectToDatabase();
  return db.collection("fighters").findOne({ slug });
}

// Fetches the three most recent fighter documents from the database.
export async function getLatestFighters() {
  const db = await connectToDatabase();
  return db.collection("fighters").find().sort({ date: -1 }).limit(3).toArray();
}

// Fetches the unique years when fighters were added to the database.
export async function getAvailableFighterYears() {
  const db = await connectToDatabase();
  const years = await db
    .collection("fighters")
    .aggregate([
      { $group: { _id: { $year: { $toDate: "$date" } } } },
      { $sort: { _id: 1 } },
    ])
    .toArray();
  return years.map((year) => year._id);
}

// Fetches fighter documents for a specific year from the database.
export async function getFightersForYear(year) {
  const db = await connectToDatabase();
  return db
    .collection("fighters")
    .find({ date: { $regex: `^${year}` } })
    .sort({ date: -1 })
    .toArray();
}

// Fetches unique months in which fighters were added for a specific year.
export async function getFightersForMonth(year) {
  const db = await connectToDatabase();
  const months = await db
    .collection("fighters")
    .aggregate([
      { $match: { date: { $regex: `^${year}`, $options: "i" } } },
      { $group: { _id: { $month: { $toDate: "$date" } } } },
      { $sort: { _id: 1 } },
    ])
    .toArray();
  return months.map((month) => month._id);
}

// Fetches fighter documents for a specific year and month from the database.
export async function getFightersForYearAndMonth(year, month) {
  const db = await connectToDatabase();
  return db
    .collection("fighters")
    .find({ date: { $regex: `^${year}-${month.padStart(2, "0")}` } })
    .sort({ date: -1 })
    .toArray();
}
