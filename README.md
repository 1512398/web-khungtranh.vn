# web-khungtranh.vn
khungtranh.vn

Install packages:
npm install --save express body-parser express-handlebars express-handlebars-paginate pg pg-hstore sequelize passport connect-flash express-session sequelize-cli bcrypt-nodejs passport-local passport-google-oauth passport-facebook paypal-rest-sdk vn-payments

Create database:
node_modules/.bin/sequelize init
node_modules/.bin/sequelize model:generate --name User --attributes email:string