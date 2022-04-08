import 'dotenv/config'

const pagarme = require('pagarme')

import {
  Ctx,
  Mutation,
  Resolver
} from 'type-graphql'

import Context from '../../@types/interfaces/Context.interface'

const PAGARME_PUBLIC_KEY = process.env.PAGARME_PUBLIC_KEY

@Resolver()
export class PaymentResolver {
  @Mutation(() => String)
  async sendTransaction(@Ctx() ctx: Context): Promise<String | null> {
    const body = ctx.req.body
    console.warn(body)
    console.warn('key', PAGARME_PUBLIC_KEY)
    const client = await pagarme.client.connect({
      api_key: PAGARME_PUBLIC_KEY
    })

    console.warn(client)

    // const transaction = await client.transactions
    //   .create(body)
    //   .catch(function (err: any) {
    //     return err
    //   })

    // console.log(transaction)
    return "ok"
  }
}