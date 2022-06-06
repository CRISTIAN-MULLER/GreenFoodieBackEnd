import { Field, InputType } from 'type-graphql'
import { QueryOptions } from 'mongoose'

@InputType()
export default class UserFilter {
	@Field(() => String, { nullable: true })
	firstName?: QueryOptions

	@Field(() => String, { nullable: true })
	lastName?: QueryOptions

	@Field(() => String, { nullable: true })
	fullName?: QueryOptions

	@Field(() => String, { nullable: true })
	phone?: QueryOptions

	@Field(() => String, { nullable: true })
	email?: QueryOptions

	@Field(() => [String], { nullable: true })
	_id?: QueryOptions
}
