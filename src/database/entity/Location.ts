import { Prop } from '@typegoose/typegoose'
import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('CoordinatesInput')
export class Coordinates {
	@Field()
	@Prop()
	latitude: number

	@Field()
	@Prop()
	longitude: number

	@Field()
	@Prop()
	latitudeDelta: number

	@Field()
	@Prop()
	longitudeDelta: number
}

@ObjectType()
export default class Location {
	@Field({ nullable: true })
	@Prop({ default: 'LatLng' })
	type: string

	@Field(() => Coordinates, { nullable: true })
	@Prop({ type: Coordinates, _id: false })
	coordinates: Coordinates
}
