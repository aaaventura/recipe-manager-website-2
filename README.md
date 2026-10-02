What are the steps that i need. 


# description 

# installation setup 
parts of the installation? 

# dependencies. 
node version 24.20.0 is what was used. 

# Set up Clerk
set up supabase and clerk. 
clerk is first because we connect it to supabase. 

# set up Supabase 
supabase setup.


# clone the repo. 

git clone *url*


# set up .env

## client .env
in the client directory, create .env
parameters for client. 

VITE_CLERK_PUBLISHABLE_KEY=
VITE_SERVER_ORIGIN=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

## server .env
in the server directory, create .env

DATABASE_URL=

DIRECT_URL=

CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=


# install the dependencies in each package. 
from root, do npm install 

go into client and do npm install 

go into server and do npm install

there has to be a way to do this all in a single command so that I don't have to go into each directory to install, right?

# migrate schema.
go into the schema.prisma 
do npx prisma migrate dev. 


after migrating, you change the permissions with the SQL commands

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO anon, authenticated;

alter table "User" alter column id set default gen_random_uuid();

**might change order since we would need to push the schema to do these SQL commands?**



# run and test.
npm run dev from root
this tests everything properly.

