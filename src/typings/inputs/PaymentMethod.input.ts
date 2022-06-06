import { PAYMENT_STATUS } from '@typings/enums/Payment.enum'
import { Field, InputType } from 'type-graphql'

@InputType()
class CardPayment {
	@Field()
	cardNumber: string

	@Field()
	cardName: string

	@Field()
	cardHolderName: string

	@Field()
	expirationDate: string

	@Field()
	cardBrand: string

	@Field()
	cvv: string

	@Field()
	isFavorite: boolean
}

@InputType()
class Card {
	@Field({ nullable: true })
	cardBrand?: string

	@Field({ nullable: true })
	type?: string
}

@InputType()
class Cash {
	@Field({ nullable: true })
	change?: string
}

@InputType()
class DeliveryPayment {
	@Field({ nullable: true })
	card?: Card

	@Field({ nullable: true })
	cash?: Cash
}

@InputType()
export class UserPaymentMethodInput {
	@Field(() => CardPayment, { nullable: true })
	app?: CardPayment

	@Field(() => DeliveryPayment, { nullable: true })
	delivery?: DeliveryPayment
}

@InputType()
export class PaymentMethodInput {
	@Field(() => UserPaymentMethodInput)
	paymentMethod: UserPaymentMethodInput

	@Field(() => PAYMENT_STATUS)
	paymentStatus: PAYMENT_STATUS
}
