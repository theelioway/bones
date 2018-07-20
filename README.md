![](elio-bones-logo.png)

# bones

Universal api for Schema.org models done the elioWay.

> Dropping the pretence one thing is so different from another.
**Tim Bushell**

## Dev Steps

 * [https://www.djamseed.com/2016/03/30/building-restful-apis-with-express-and-mongodb/](https://www.djamseed.com/2016/03/30/building-restful-apis-with-express-and-mongodb/)

```bash
mkdir bones
cd bones
npm install --save express body-parser mongoose
mkdir configs
mkdir -p src/models
mkdir -p src/routes
touch configs/database.js
touch src/models/thing.js
touch src/routes/thing.js
touch src/server.js
touch src/app.js
npm install --save-dev nodemon
```

Add to package.json['scripts']

```
"devstart": "nodemon server.js"
```

Run the development server thusly:
``bash
npm run devstart
```

## Usage

```bash
```

## Seeing is believing

```bash
```

## Mongo issues

```
sudo systemctl unmask mongodb
Unit mongodb.service does not exist, proceeding anyway.
sudo service mongod start
```

## Credits
