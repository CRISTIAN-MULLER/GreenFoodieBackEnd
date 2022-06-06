import { Prop } from '@typegoose/typegoose'
import { Field, InputType, ObjectType } from 'type-graphql'

@ObjectType()
@InputType('CardInfoInput')
export default class CardInfo {
	@Field({ nullable: true })
	@Prop()
	cardName: string

	@Field({ nullable: true })
	@Prop()
	cardHolderName: string

	@Field({ nullable: true })
	@Prop()
	cardNumber: string

	@Field({ nullable: true })
	@Prop()
	expirationDate: string

	@Field({ nullable: true })
	@Prop()
	cardBrand: string

	@Field({ nullable: true })
	@Prop()
	cvv: string

	@Field({ nullable: true })
	@Prop()
	isFavorite: boolean
}
