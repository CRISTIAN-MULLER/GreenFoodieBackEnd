import { Prop } from '@typegoose/typegoose'
import { PAYMENT_STATUS } from '@typings/enums/Payment.enum'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class App {
	@Field({ nullable: true })
	@Prop()
	cardNumber: string

	@Field({ nullable: true })
	@Prop()
	cardName: string

	@Field({ nullable: true })
	@Prop()
	cardHolderName: string

	@Field({ nullable: true })
	@Prop()
	expirationDate: string

	@Field({ nullable: true })
	@Prop()
	cardBrand: string

	@Field({ nullable: true })
	@Prop()
	cvv: string

	@Field()
	@Prop({ default: false })
	isFavorite: boolean
}

@ObjectType()
class UserCard {
	@Field({ nullable: true })
	@Prop()
	cardBrand?: string

	@Field({ nullable: true })
	@Prop()
	type?: string
}

@ObjectType()
class UserCash {
	@Field({ nullable: true })
	@Prop()
	change?: string
}

@ObjectType()
class Delivery {
	@Field({ nullable: true })
	@Prop()
	card?: UserCard

	@Field({ nullable: true })
	@Prop()
	cash?: UserCash
}

@ObjectType()
class UserPaymentMethod {
	@Field({ nullable: true })
	@Prop({
		type: App,
	})
	app?: App

	@Field({ nullable: true })
	@Prop({
		type: Delivery,
	})
	delivery?: Delivery
}

@ObjectType()
export default class PaymentMethod {
	@Field()
	@Prop({
		type: UserPaymentMethod,
	})
	paymentMethod: UserPaymentMethod

	@Field()
	@Prop({
		type: String,
		enum: PAYMENT_STATUS,
		default: PAYMENT_STATUS.TO_PAY,
	})
	paymentStatus: PAYMENT_STATUS

	@Field()
	@Prop()
	totalPrice: number
}
