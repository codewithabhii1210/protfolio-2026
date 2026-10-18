import app from "../server/app.js";
import { connectDatabase } from "../server/config/database.js";

const isContactPost = (req) =>
  req.method === "POST" && /^\/api\/contact\/?$/.test(req.url || req.path || "");

export default async function handler(req, res) {
  if (isContactPost(req)) {
    // Warm the connection but never block the form on it: the contact
    // controller opens its own connection in the background, so a slow or
    // cold MongoDB connect cannot delay the visitor's response.
    connectDatabase().catch((e) => console.error("[db] warm-up failed:", e?.message || e));
  } else {
    await connectDatabase();
  }
  return app(req, res);
}
