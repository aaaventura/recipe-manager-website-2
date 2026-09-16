# recipe-manager-website-2


# MVP Completion Checklist
Use this checklist to track your progress toward completing the minimum viable product:
## Infrastructure & Setup
- [ ] Vite + React + TypeScript client initialized
- [ ] Express + TypeScript server initialized
- [ ] Database connected and schema created
- [ ] Migrations run successfully
- [ ] Categories seeded in database
- [ ] Environment variables configured (client and server)
- [ ] Clerk application created and publishable/secret keys configured
- [ ] CORS configured between client and server
- [ ] Both client and server run without errors in development
## Public Recipe Features
- [ ] Home page displays
- [ ] Recipe list page shows all recipes fetched from the API
- [ ] Recipe detail page displays complete recipe information
- [ ] Ingredients display in correct order
- [ ] Directions display in sequential order
- [ ] Categories display on recipe pages
- [ ] Category filter/list page works
- [ ] Can browse recipes by category
- [ ] Recipe creator names display
## Authentication System
- [ ] Clerk application created in the Clerk Dashboard
- [ ] `@clerk/react` installed and `<ClerkProvider>` configured on the client
- [ ] `@clerk/express` installed and `clerkMiddleware()` / `requireAuth()` configured on the server
- [ ] User registration works via Clerk's `<SignUp />` flow
- [ ] User login works via Clerk's `<SignIn />` flow
- [ ] Users can logout
- [ ] Session persists across page reloads
- [ ] Client sends the Clerk session token as a Bearer header on API requests
- [ ] Protected API routes reject requests without a valid Clerk session
- [ ] Protected client routes redirect unauthenticated users
- [ ] Local `users` table row is created/linked on a user's first authenticated request, keyed by Clerk user ID
## User Dashboard
- [ ] Dashboard accessible only when authenticated
- [ ] Dashboard displays user name and email
- [ ] Dashboard shows count of user's recipes
- [ ] Link to create new recipe present
## Recipe Creation
- [ ] Create recipe page accessible (authenticated only)
- [ ] Form includes all basic recipe fields
- [ ] Can add ingredient fields dynamically
- [ ] Can remove ingredient fields
- [ ] Can add direction/step fields dynamically
- [ ] Can remove direction/step fields
- [ ] Can select multiple categories
- [ ] Client-side validation works
- [ ] Server-side validation works
- [ ] Loading state displays during submission
- [ ] Recipe creates successfully with all relationships
- [ ] Ingredients save with correct order
- [ ] Directions save with correct numbering
- [ ] Categories link correctly (many-to-many)
- [ ] Client redirects to recipe page after creation
- [ ] Error messages display appropriately
- [ ] Created recipe shows creator's name
## Code Quality & Organization
- [ ] Clear `client/` vs `server/` separation
- [ ] Express routes organized in `server/src/routes/`
- [ ] Controller logic organized in `server/src/controllers/`
- [ ] Client pages/components organized logically
- [ ] RESTful routing conventions followed (both client routes and API routes)
- [ ] Naming conventions consistent
- [ ] TypeScript types used appropriately on both sides
- [ ] Regular Git commits with good messages
- [ ] .env files not committed to repository
## Documentation
- [ ] README.md created
- [ ] Setup instructions documented (including how to run client and server together)
- [ ] Technology stack listed
- [ ] Features documented
- [ ] Known issues noted