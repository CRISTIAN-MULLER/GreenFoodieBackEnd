import { Prop } from '@typegoose/typegoose'
import { PAYMENT_METHOD, PAYMENT_STATUS } from '@typings/enums/Payment.enum'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class PaymentMethod {
	@Field()
	@Prop({
		type: String,
		enum: PAYMENT_METHOD,
		default: PAYMENT_METHOD.CASH_ON_DELIVERY,
	})
	paymentMethod: PAYMENT_METHOD

	@Field()
	@Prop({
		type: String,
		enum: PAYMENT_STATUS,
		default: PAYMENT_STATUS.TO_PAY,
	})
	paymentStatus: PAYMENT_STATUS

	@Field()
	@Prop()
	cardBrand: string

	@Field()
	@Prop()
	// troco
	change: number
}
