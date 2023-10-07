# Northcoders News API

<Description>
This project is an API designed to provide application data programmatically. It mimics the backend service of a real-world application like Reddit, enabling front-end architectures to access essential information.

<Live Demo>
Explore the live version of the API: https://id1203.onrender.com

<Installation and Setup>

Clone the Repository:
- Use git clone https://github.com/ID1203/ID_News.git to clone the repository to your local machine.

Install Dependencies:
- Run npm install to install all project dependencies.

Set Up Local Database:
- Execute npm run setup-dbs to set up the local database.

Seed the Database:
- Run npm run seed to populate the database with initial data.

Run Tests:
- Execute npm test to run automated tests and ensure code integrity.

Production Deployment:
- Start the server using npm start.

To seed the production database:
- run npm run seed_prod.

<Environment Variables>
Create the following .env files for different environments:

Development (.env)
- PGDATABASE=your-development-database-name

Testing (test.env)
- PGDATABASE=your-test-database-name

Production (production.env)
- DATABASE_URL=your-production-database-url

