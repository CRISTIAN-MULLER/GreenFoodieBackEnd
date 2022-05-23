import { Field, InputType } from 'type-graphql'
import { QueryOptions } from 'mongoose'

@InputType()
export default class ProductFilter {
	@Field(() => String, { nullable: true })
	name?: QueryOptions

	@Field(() => String, { nullable: true })
	description?: QueryOptions

	@Field(() => [String], { nullable: true })
	categories?: QueryOptions

	@Field(() => String, { nullable: true })
	status?: QueryOptions

	@Field(() => [String], { nullable: true })
	_id?: QueryOptions
}
