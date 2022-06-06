import { mongoose } from '@typegoose/typegoose'
import { ORDER_ORIGIN, ORDER_STATUS } from '@typings/enums/Order.enum'
import { Field, ID, InputType } from 'type-graphql'
import AddressInput from './Address.input'

import OrderItemInput from './OrderItem.input'
import { PaymentMethodInput } from './PaymentMethod.input'

@InputType()
export default class OrderInput {
	@Field(() => ID)
	customerId: mongoose.Types.ObjectId

	@Field(() => [OrderItemInput])
	items: OrderItemInput[]

	@Field()
	phone: string

	@Field(() => AddressInput)
	deliveryAddress: AddressInput

	@Field(() => PaymentMethodInput)
	payment: PaymentMethodInput

	@Field(() => ORDER_ORIGIN)
	origin: ORDER_ORIGIN

	@Field(() => ORDER_STATUS)
	status: ORDER_STATUS

	@Field()
	step: number

	@Field()
	observation: string
}
