import { Field, InputType } from 'type-graphql'
import { Coordinates } from '@database/entity/Location'

@InputType()
export default class LocationInput {
	@Field({ nullable: true })
	type: string

	@Field(() => Coordinates, { nullable: true })
	coordinates: Coordinates
}
