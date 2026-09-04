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

Content is currently served from static modules in `src/data`. These are placeholders for
Azure Database for PostgreSQL records and Azure Blob Storage media URLs.
Cities with content: `blr`, `maa`, `hyd`. Photos are JPEG under 1 MB and videos are MP4 under 10 seconds.

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

## Environment variables

See [.env.example](.env.example) for required Entra ID and JWT configuration. `ENTRA_TENANT_ID`, `ENTRA_CLIENT_ID`, `ENTRA_CLIENT_SECRET`, and `ENTRA_AUDIENCE` come from your Azure AD App Registration. `JWT_SECRET` should be a long random string, kept secret and out of source control.
