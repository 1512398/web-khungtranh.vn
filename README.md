# web-khungtranh.vn
khungtranh.vn

Install packages:
npm install --save express body-parser express-handlebars express-handlebars-paginate pg pg-hstore sequelize sequelize-cli passport connect-flash express-session sequelize-cli bcrypt-nodejs passport-local passport-google-oauth passport-facebook paypal-rest-sdk vn-payments express requestnode multer express-session jsonwebtoken connect-pg-simple cookie-parser csurf passport-jwt

Create database:
node_modules/.bin/sequelize init
node_modules/.bin/sequelize model:generate --name User --attributes email:string