import 'dotenv/config'
import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'

import express from 'express'

var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session)

import { createConnection } from 'typeorm'

import { RegisterResolver } from './modules/user/Register'
import { LoginResolver } from './modules/user/Login'
import { GetUserResolver } from '@modules/user/LogedUser'
import cors from 'cors'
import { LogoutResolver } from '@modules/user/Logout'


const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 4000
const SESSIONS_SECRET = process.env.SESSIONS_SECRET
const NODE_ENV = process.env.NODE_ENV

const main = async () => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [
      GetUserResolver,
      RegisterResolver,
      LoginResolver,
      LogoutResolver
    ]
  })

  var store = new MongoDBStore({
    uri: MONGO_URL,
    collection: 'userSessions'
  })

  // Catch errors
  store.on('error', function (error: any) {
    console.log(error)
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res })
  })

  const app = await express()

  app.use(
    session({
      secret: SESSIONS_SECRET,
      saveUninitialized: false,
      store: store,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        sameSite: "none",
        secure: true,
      },
      name: "qid",
      resave: false,
    }))

  app.use(cors({
    credentials: true,
    origin: [
      'http://localhost:4000',
      'https://studio.apollographql.com',
      'https://localhost:4000',
      'http://192.168.100.3'
    ]
  }))
  app.set('trust proxy', NODE_ENV !== 'production')


  await apolloServer.start()
  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}/graphql`)
  })
}
main()