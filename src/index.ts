import 'dotenv/config'
import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
const { log } = require('mercedlogger')

import express from 'express'

var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')

import cors from 'cors'

import { RegisterResolver } from './modules/user/Register'
import { LoginResolver } from './modules/user/Login'
import { GetUserResolver } from '@modules/user/LogedUser'
import { LogoutResolver } from '@modules/user/Logout'
import { GetProductResolver } from '@modules/product/Product'
import { PaymentResolver } from '@modules/payment/Payment'


const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 4000
const SESSIONS_SECRET = process.env.SESSIONS_SECRET
const NODE_ENV = process.env.NODE_ENV

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      GetUserResolver,
      RegisterResolver,
      LoginResolver,
      LogoutResolver,
      GetProductResolver,
      PaymentResolver
    ]
  })

  mongoose.connect(MONGO_URL!)

  mongoose.connection
    // Event for When Connection Opens
    .on('open', () => log.green('STATUS', 'Connected to Mongo'))
    // Event for When Connection Closes
    .on('close', () => log.red('STATUS', 'Disconnected from Mongo'))
    // Event for Connection Errors
    .on('error', (error: any) => log.red('ERROR', error))

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