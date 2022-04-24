import paginationPlugin, { PaginateModel } from 'typegoose-cursor-pagination'
import {
	getModelForClass,
	mongoose,
	Prop,
	plugin,
	Ref,
} from '@typegoose/typegoose'
import { IsDefined } from 'class-validator'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './Users'
import OrderItem from './OrderItem'
import Address from './Address'
import PaymentMethod from './PaymentMethod'
import { ORDER_ORIGIN, ORDER_STATUS } from '@typings/enums/Order.enum'

@plugin(paginationPlugin)
@ObjectType()
export default class Order {
	@Field(() => ID)
	_id: mongoose.Types.ObjectId

	@Field(() => ID)
	@Prop({ ref: () => User })
	@IsDefined()
	customerId: Ref<User>

	@Field(() => [OrderItem])
	@Prop({ type: [OrderItem] })
	items: OrderItem[]

	@Field()
	@Prop()
	phone: string

	@Field(() => Address)
	@Prop({ type: Address })
	address: Address

	@Field(() => PaymentMethod)
	@Prop({ type: PaymentMethod })
	payment: PaymentMethod

	@Field()
	@Prop({ type: String, enum: ORDER_ORIGIN, default: ORDER_ORIGIN.APP })
	origin: ORDER_ORIGIN

	@Field()
	@Prop({
		type: String,
		enum: ORDER_STATUS,
		default: ORDER_STATUS.ORDER_PLACED,
	})
	status: ORDER_STATUS

	@Field()
	@Prop()
	observation: string
}

export const OrderModel = getModelForClass(Order) as PaginateModel<
	Order,
	typeof Order
>
