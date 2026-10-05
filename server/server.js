import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";
if (!process.env.JWT_SECRET) {
  console.error("Set JWT_SECRET in server/.env");
  process.exit(1);
}
await connectDatabase();
app.listen(process.env.PORT || 5000, () => console.log("API running"));
