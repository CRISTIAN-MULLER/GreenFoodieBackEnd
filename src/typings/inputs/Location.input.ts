import { Field, InputType } from 'type-graphql'

@InputType()
export default class LocationInput {
	@Field({ nullable: true })
	type: string

	@Field(() => [Number, Number], { nullable: true })
	coordinates: [number, number]
}
