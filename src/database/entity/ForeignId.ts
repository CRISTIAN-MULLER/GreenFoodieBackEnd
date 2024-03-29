import { Prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class ForeignId {
	@Field({ nullable: true })
	@Prop()
	userId: string

	@Field({ nullable: true })
	@Prop()
	provider: string
}
