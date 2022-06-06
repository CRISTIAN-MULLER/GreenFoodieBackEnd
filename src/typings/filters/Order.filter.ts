import { Field, InputType } from 'type-graphql'
import { QueryOptions } from 'mongoose'

@InputType()
export default class OrderFilter {
	@Field(() => [String], { nullable: true })
	_id?: QueryOptions
}
