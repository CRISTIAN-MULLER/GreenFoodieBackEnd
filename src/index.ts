import 'dotenv/config'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import express from 'express'

import cors from 'cors'

import RegisterUserResolver from '@modules/user/Register'
import LoginUserResolver from '@modules/user/Login'
import LoggedUserResolver from '@modules/user/LoggedUser'
import LogoutResolver from '@modules/user/Logout'
import ProductResolver from '@modules/product/Product'
import OrderResolver from '@modules/order/Order'
import PaymentResolver from '@modules/payment/Payment'

const { log } = require('mercedlogger')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const mongoose = require('mongoose')

const { MONGO_URL } = process.env
const { PORT } = process.env || 4000
const { SESSIONS_SECRET } = process.env
const { NODE_ENV } = process.env

const main = async () => {
	const schema = await buildSchema({
		resolvers: [
			LoggedUserResolver,
			LoginUserResolver,
			LogoutResolver,
			OrderResolver,
			PaymentResolver,
			ProductResolver,
			RegisterUserResolver,
		],
	})

	mongoose.connect(MONGO_URL!)

	mongoose.connection
		// Event for When Connection Opens
		.on('open', () => log.green('STATUS', 'Connected to Mongo'))
		// Event for When Connection Closes
		.on('close', () => log.red('STATUS', 'Disconnected from Mongo'))
		// Event for Connection Errors
		.on('error', (error: any) => log.red('ERROR', error))

	const store = new MongoDBStore({
		uri: MONGO_URL,
		collection: 'userSessions',
	})

	// Catch errors
	store.on('error', (error: any) => {
		console.log(error)
	})

	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }: any) => ({ req, res }),
	})

	const app = await express()

	app.use(
		session({
			secret: SESSIONS_SECRET,
			saveUninitialized: false,
			store,
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
				httpOnly: true,
				sameSite: 'none',
				secure: true,
			},
			name: 'qid',
			resave: false,
		}),
	)

	app.use(
		cors({
			credentials: true,
			origin: [
				'http://localhost:4000',
				'https://studio.apollographql.com',
				'https://localhost:4000',
				'http://192.168.100.3',
			],
		}),
	)
	app.set('trust proxy', NODE_ENV !== 'production')

	await apolloServer.start()
	apolloServer.applyMiddleware({ app, cors: false })

	app.listen(PORT, () => {
		console.log(`Listening on port http://localhost:${PORT}/graphql`)
	})
}
main()
