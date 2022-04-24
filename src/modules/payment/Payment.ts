import 'dotenv/config'

import { Ctx, Mutation, Resolver } from 'type-graphql'

import Context from '@typings/interfaces/Context.interface'

const pagarme = require('pagarme')

const { PAGARME_PUBLIC_KEY } = process.env

@Resolver()
export default class PaymentResolver {
	@Mutation(() => String)
	async sendTransaction(@Ctx() ctx: Context): Promise<String | null> {
		const { body } = ctx.req
		console.warn(body)
		console.warn('key', PAGARME_PUBLIC_KEY)
		const client = await pagarme.client.connect({
			api_key: PAGARME_PUBLIC_KEY,
		})

		console.warn(client)

		// const transaction = await client.transactions
		//   .create(body)
		//   .catch(function (err: any) {
		//     return err
		//   })

		// console.log(transaction)
		return 'ok'
	}
}
