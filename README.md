# How to set up prisma + postgres in docker
## run on terminal
- create a user and a password in postgres if you don't have
- docker run --name (your-container-name) -p 5432:5432 -e POSTGRES_USER=(your-user) -e POSTGRES_PASSWORD=(your-password) -e POSTGRES_DB=(your-database-name) -d postgres
- create a .env file and add DATABASE_URL as it is in example but changing the variables