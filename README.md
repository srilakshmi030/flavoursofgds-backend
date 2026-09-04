# flavoursofgds-backend

Node.js + Express backend with Microsoft Entra ID (Azure AD) SSO and JWT-based auth.

## Auth flow

1. Frontend signs the user in via MSAL against Microsoft Entra ID and obtains an access/ID token.
2. Frontend calls `POST /api/auth/login` with `Authorization: Bearer <entra-token>`.
3. Backend validates the Entra token's signature/issuer/audience (`verifyEntraToken` middleware) and issues its own app JWT.
4. Frontend uses the app JWT (`Authorization: Bearer <app-jwt>`) for all subsequent API calls, verified by `verifyJwt` middleware.

## Endpoints

| Method | Path                                | Auth        | Description                                   |
|--------|-------------------------------------|-------------|------------------------------------------------|
| GET    | /health                             | none        | Liveness check                                  |
| POST   | /api/auth/login                     | Entra token | Exchange Entra ID token for an app JWT          |
| GET    | /api/cities                         | App JWT     | List the top 20 supported metropolitan cities   |
| POST   | /api/cities/select                  | App JWT     | Called when the user selects a city (`{ "cityId": "blr" }`) |
| GET    | /api/cities/:cityCode/dashboard     | App JWT     | City home screen: banner, about, snaps          |
| GET    | /api/cities/:cityCode/street-food   | App JWT     | Street food list for the city                   |
| GET    | /api/cities/:cityCode/landmarks     | App JWT     | Landmarks list for the city                     |
| GET    | /api/cities/:cityCode/fine-dining   | App JWT     | Fine dining list for the city                   |
| GET    | /api/cities/:cityCode/recipes       | App JWT     | Recipes for the city                            |
| GET    | /api/cities/:cityCode/top-recipes   | App JWT     | Top 3 winning recipes for the city              |
| GET    | /api/cities/:cityCode/winningRecipes| App JWT     | Ranked contest winners with award labels        |
| GET    | /api/cities/:cityCode/videos        | App JWT     | Video bites for the city                        |
| GET    | /api/cities/:cityCode/photos        | App JWT     | Photo gallery for the city                      |
| GET    | /api/userProfile                    | App JWT     | Signed-in user profile from JWT claims          |
| GET    | /api/street-food/:id                | App JWT     | Street food details                             |
| GET    | /api/landmarks/:id                  | App JWT     | Landmark details                                |
| GET    | /api/restaurants/:id                | App JWT     | Fine dining restaurant details                  |
| GET    | /api/recipes/:recipeId              | App JWT     | Recipe details                                  |

Content is served from PostgreSQL via Sequelize (`src/services/content.service.js`).
Image paths are stored relative in `media_assets`; responses compose the full URL from
`BLOB_BASE_URL`. Seeded cities: `blr`. Photos are JPEG under 1 MB and videos are MP4 under
10 seconds.

`/api/cities/:cityCode/landmarks` returns *culinary* landmarks (notable eateries), matching
the source brochure. `src/data/cities.js` remains the static reference list backing
`GET /api/cities` and `POST /api/cities/select`.

## Test app

`test-app/` is a mobile-sized React front end used to exercise these endpoints.

```bash
npm run dev            # backend on http://localhost:4000
cd test-app
npm install
npm run dev            # test app on http://localhost:3000
```

Sign in with any username and the value of `DEV_LOGIN_PASSWORD`. `POST /api/auth/dev-login`
exists only for this test app: it returns 404 when `NODE_ENV=production` or when
`DEV_LOGIN_PASSWORD` is unset. Production sign-in must use the Entra ID flow via `/api/auth/login`.

## Setup

```bash
cd flavoursofgds-backend
npm install
copy .env.example .env   # fill in your Entra ID App Registration values
npm run dev
```

## Database (local Docker)

PostgreSQL 16 runs in Docker; Sequelize owns the schema.

```bash
copy .env.example .env   # set DB_PASSWORD to any local value
npm install
npm run db:up            # starts Postgres on localhost:5432
npm run db:seed          # creates tables and loads Bengaluru
npm run db:down          # stops it (data survives in the pgdata volume)
```

`scripts/seed.js` reads `scripts/city-source-content/blr.js` — the Bengaluru chapter
transcribed from the source brochure — and is safe to re-run.

Schema: `cities`, `city_details`, `media_assets`, `city_snaps`, `street_food`
(+ `street_food_venues`), `venues` (+ `venue_highlights`), `recipes`
(+ `recipe_ingredients`, `recipe_steps`), `user_preferences`.

Two things worth knowing:

- `media_assets` is the only place image paths live. Paths are relative
  (`cities/blr/banner.jpg`); the public URL is composed at read time from `BLOB_BASE_URL`.
  Each asset carries a `status` of `ready`, `missing`, or `pending_review`.
- `venues` covers both the Culinary Landmarks and Fine Dine screens via a `venue_type`
  enum, because the brochure treats both as eateries.

The seed uses `sequelize.sync()`, which is fine for a local throwaway database. Add
`sequelize-cli` migrations before pointing this at any shared or Azure environment.

`src/data/cityContent.js` is now unused and can be deleted once you no longer need the
old `maa` and `hyd` placeholder content for reference.

## Sandbox transfer

Nothing environment-specific is hardcoded, so moving to a sandbox is a config exercise:

1. Clone the repo, then `npm install` in both the root and `test-app/`.
2. `copy .env.example .env` and set `CORS_ORIGIN`, `BLOB_BASE_URL`, the four `ENTRA_*`
   values from the sandbox App Registration, and a fresh `JWT_SECRET`.
3. `copy test-app\.env.example test-app\.env` and set `VITE_API_BASE_URL` to the sandbox API host.
4. `Bangalore.pdf` and the generated workbooks in `docs/` are gitignored — transfer those
   out of band.

Secrets never live in the repo. `.env` is gitignored in both the root and `test-app/`.

## Deployment notes (Intune)

Packaging and distribution are handled by another team, but these constraints shape the code:

- **No localhost assumptions.** `CORS_ORIGIN` (backend) and `VITE_API_BASE_URL` (front end,
  baked in at build time) must both be set to real hosts before building.
- **HTTPS only.** An Intune-delivered build will not be allowed to call an HTTP API.
- **Auth travels in the `Authorization` header**, not cookies, so app protection policies
  that block third-party cookies do not break the session.
- **If the front end is wrapped in a WebView**, its origin may be a custom scheme or `null`.
  Serving the built front end from the same origin as the API avoids CORS entirely and is
  the safer option — worth confirming with the deployment team.
- **`/api/auth/dev-login` must stay disabled**: it 404s when `NODE_ENV=production` or
  `DEV_LOGIN_PASSWORD` is unset. Leave `DEV_LOGIN_PASSWORD` empty in any deployed environment.

## Environment variables

See [.env.example](.env.example) for required Entra ID and JWT configuration. `ENTRA_TENANT_ID`, `ENTRA_CLIENT_ID`, `ENTRA_CLIENT_SECRET`, and `ENTRA_AUDIENCE` come from your Azure AD App Registration. `JWT_SECRET` should be a long random string, kept secret and out of source control.
