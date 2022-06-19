import { Field, InputType } from 'type-graphql'

@InputType()
class InputForeignId {
	@Field({ nullable: true })
	userId: string

	@Field({ nullable: true })
	provider: string
}

@InputType()
export default class ForeignLoginInput {
	@Field()
	firstName: string

	@Field()
	lastName: string

	@Field()
	email: string

	@Field()
	profilePicture: string

	@Field()
	foreignId: InputForeignId
}
