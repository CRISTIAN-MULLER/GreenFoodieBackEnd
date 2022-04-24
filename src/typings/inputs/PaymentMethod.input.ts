import { PAYMENT_METHOD, PAYMENT_STATUS } from '@typings/enums/Payment.enum'
import { Field, InputType } from 'type-graphql'

@InputType()
export default class PaymentMethodInput {
	@Field(() => PAYMENT_METHOD)
	paymentMethod: PAYMENT_METHOD

	@Field(() => PAYMENT_STATUS)
	paymentStatus: PAYMENT_STATUS

	@Field()
	cardBrand: string

	@Field()
	// troco
	change: number
}
