### connection to database
#### 1- first of all open: https://orm.drizzle.team
#### 2- open documentation -> PostgreSQL: https://orm.drizzle.team/docs/get-started-postgresql
#### 3- install this packages:
```json
npm i drizzle-orm postgres
npm i -D drizzle-kit
```
#### 4- Go to neon: https://console.neon.tech/app/org-curly-heart-96592606/projects 
#### 5- create new database from there : https://console.neon.tech/app/projects/red-silence-82594485/branches/br-white-grass-a89n0tez/tables?database=Expenses-Tracker 
#### 6- in this page: https://console.neon.tech/app/projects/red-silence-82594485?database=Expenses-Tracker&branchId=br-white-grass-a89n0tez from dashboard tab, click on connect, and copy neon key: postgresql://neondb_owner:npg_2ACjHhUzo0Ld@ep-noisy-frog-a8shlbw5-pooler.eastus2.azure.neon.tech/Expenses-Tracker?sslmode=require&channel_binding=require
#### 7- add this scripts to package.json :
```json
    "db:push": "npx drizzle-kit push",
    "db:studio": "npx drizzle-kit studio"
```

#### 8- after create this files: (drizzle.config.js | dbConfig.jsx | schema.jsx), run this command to push your tables live :
```json
D:\Next js\Projects\expense-tracker>npm run db:push

> expense-tracker@0.1.0 db:push
> npx drizzle-kit push

No config path provided, using default 'drizzle.config.js'
Reading config file 'D:\Next js\Projects\expense-tracker\drizzle.config.js'
Using '@neondatabase/serverless' driver for database querying
 Warning  '@neondatabase/serverless' can only connect to remote Neon/Vercel Postgres/Supabase instances through a websocket
[✓] Pulling schema from database...
[✓] Changes applied

D:\Next js\Projects\expense-tracker>
```

#### 9- after that, we need to run our database tables localy, install this package:
```json
npm i -D pg
```
#### 10- run database tables on localhost:
```json
npm run db:studio
```