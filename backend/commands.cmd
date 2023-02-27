@REM Creating Model for Spots
npx sequelize-cli model:generate --name Spot --attributes ownerId:INTEGER,address:STRING,city:STRING,state:STRING,country:STRING,lat:DECIMAL,lng:DECIMAL,name:STRING,description:STRING,price:DECIMAL

@REM Creating Model for Bookings
npx sequelize-cli model:generate --name Booking --attributes spotId:INTEGER,userId:INTEGER,startDate:DATE,endDate:DATE

@REM Creating Model for Reviews
npx sequelize-cli model:generate --name Review --attributes spotId:INTEGER,userId:INTEGER,review:STRING,stars:INTEGER

@REM Creating Model for SpotImages
npx sequelize-cli model:generate --name SpotImage --attributes spotId:INTEGER,url:STRING,preview:BOOLEAN

@REM Creating Model for ReviewImages
npx sequelize-cli model:generate --name ReviewImage --attributes reviewId:INTEGER,url:STRING

@REM Doing the Migrations
npx dotenv sequelize-cli db:migrate

@REM Undoing Migrations
npx dotenv sequelize-cli db:migrate:undo:all

@REM Creating Seeds
npx sequelize-cli seed:generate --name <descriptiveName>

@REM Seeding
npx dotenv sequelize-cli db:seed:all

@REM Undoing Seeds
npx dotenv sequelize-cli db:seed:undo:all