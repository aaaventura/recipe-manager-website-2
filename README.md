# Recipe Manager Website - Ace Project Space Training

# installation setup 
parts of the installation? 

# Stack
- node version 24.20.0
- React@vite
- Express
- npm
- Clerk account
- Supabase account.


# Features
- Homepage
- Recipe list page shows all recipes
- Recipe detail page displays complete recipe information
- directions display in correct order
- categories display on recipe pages
- directory filters by categories
- recipe creator name displays
- user registration/login/logout via clerk
- session persists across page reloads
- User dashboard (name, email, recipe count, and recipes)
- create recipe with dynamic ingredient/direction fields
- select multiple categories
- form validation + loading states
- recipe saves with correct ordering and relationships


# Installation and Setup
## Clone the Repository 

git clone respository-url

cd project-repository


# Set up Clerk
Clerk is configure first so that we can connected it to Supabase for authentication

1. create new application in the clerk dashboard.
2. Copy Publishable Key and Secret Key for .env files.
3. Enable Supabase Integration.

# set up Supabase 
1. create a new project in the Supabase Dashboard.
2. From Project Settings, go to API and copy these:
    - Project URL for VITE_SUPABASE_URL
    - anon / public key for VITE_SUPABASE_ANON_KEY
3. From project settings, go to database and copy these:
    - connection string(pooler) for DATABASE_URL
    - Direct conncection string for DIRECT_URL


# set up .env
in each service, you are required to make a .env for environment variables.
## client .env
in the client directory, create .env
Variables:
VITE_CLERK_PUBLISHABLE_KEY= (Publishable key from your clerk app)
VITE_SERVER_ORIGIN= (Origin port of the backend server. example: http://localhost:3000)
VITE_SUPABASE_URL= (Supabase project URL)
VITE_SUPABASE_ANON_KEY= (Supabase anon key)


## server .env
in the server directory, create .env

DATABASE_URL= (The Supabase pooled connection string)
DIRECT_URL= (Supabase direct connection string)
CLERK_PUBLISHABLE_KEY= (Publishable key from your clerk app)
CLERK_SECRET_KEY= (Secret key from clerk app)


# install the dependencies in each package. 
This package uses npm workspaces; all packages can be installed from the root in a single command: 
npm install 

if workspaces aren't configured, install each package seperately.
cd client && npm install
cd ../server && npm install

# migrate schema.
the Prisma schema lives in server/prisma/schema.prisma. run migrations from the server/prisma directory
npx prisma migrate dev

After migrations, apply the following SQL in the Supabase SQL Editor to grant the correct permissions.

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO anon, authenticated;

alter table "User" alter column id set default gen_random_uuid();

# run and test.
From the project root, start both the client and server: 

npm run dev

# Known Issues
possible issue where installing node modules from root installs all dependencies in root's node_module directory rather than creating separated directories in their respective directories. 
solution: reclone the repository and run npm install in the client and server before running it in the root.
