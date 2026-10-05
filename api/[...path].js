import app from "../server/app.js";
import { connectDatabase } from "../server/config/database.js";

export default async function handler(req, res) {
  await connectDatabase();
  return app(req, res);
}
