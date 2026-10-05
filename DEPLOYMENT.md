# Vercel deployment

Import this repository into Vercel and keep the project root set to the repository root. The root `vercel.json` builds the React client into `client/dist`, serves it as the static site, and sends `/api/*` requests to the Express serverless function.

Set these environment variables in Vercel project settings:

- `MONGO_URI`: a MongoDB Atlas connection string. Create a database user for the portfolio database and allow the Vercel deployment to connect in Atlas Network Access.
- `JWT_SECRET`: a long, randomly generated secret for admin authentication.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: initial admin credentials used by `npm run seed --workspace server`.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`: only needed for image uploads in the admin area.

Run the seed command against the chosen MongoDB database before using admin login. Do not put database credentials or `JWT_SECRET` in `VITE_*` variables; those are exposed to the browser.

The contact form posts to `POST /api/contact`. The API validates each submission and stores it in MongoDB's `contacts` collection. Authenticated admins can review submissions through the existing admin area. Vercel and the client use the same `/api` origin, so no client API URL variable is needed.

## Local development

Run `npm install` once from the repository root. Copy `server/.env.example` to `server/.env` and set `MONGO_URI` and a private `JWT_SECRET`. Then run the API and client in separate terminals with `npm run dev --workspace server` and `npm run dev --workspace client`. The sample MongoDB URI expects a local MongoDB instance.