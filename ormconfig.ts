const MONGO_URL = process.env.MONGO_URL
export default {
  "type": "mongodb",
  "url": MONGO_URL,
  "useNewUrlParser": true,
  "synchronize": true,
  "logging": true,
  "useUnifiedTopology": true,
  "useFindAndModify": false,
  "useCreateIndex": true,
  "entities": ["src/database/entity/*.*"]
}