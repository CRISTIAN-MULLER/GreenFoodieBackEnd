import { Field, InputType } from 'type-graphql'
import { QueryOptions } from 'mongoose'

@InputType()
export default class OrderFilter {
	@Field(() => [String], { nullable: true, name: 'orderId' })
	_id?: QueryOptions

	@Field(() => [String], { nullable: true })
	customerId?: QueryOptions
}
