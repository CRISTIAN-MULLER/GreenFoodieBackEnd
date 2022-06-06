import paginationPlugin, { PaginateModel } from 'typegoose-cursor-pagination'

import {
	getModelForClass,
	mongoose,
	Prop,
	plugin,
	Ref,
} from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { IsDefined } from 'class-validator'
import { Field, ID, ObjectType } from 'type-graphql'
import { ORDER_ORIGIN, ORDER_STATUS } from '@typings/enums/Order.enum'
import User from './Users'
import OrderItem from './OrderItem'
import Address from './Address'
import PaymentMethod from './PaymentMethod'

@plugin(paginationPlugin)
@ObjectType()
export default class Order extends TimeStamps {
	@Field(() => ID)
	_id: mongoose.Types.ObjectId

	@Field()
	@Prop()
	createdAt: Date

	@Field()
	@Prop()
	updatedAt: Date

	@Field()
	@Prop()
	orderNumber: number

	@Field(() => ID)
	@Prop({ ref: () => User })
	@IsDefined()
	customerId: Ref<User>

	@Field(() => [OrderItem])
	@Prop({ type: [OrderItem], _id: false })
	items: OrderItem[]

	@Field()
	@Prop()
	phone: string

	@Field(() => Address)
	@Prop({ type: Address, _id: false })
	deliveryAddress: Address

	@Field(() => PaymentMethod)
	@Prop({ type: PaymentMethod, _id: false })
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
	step: number

	@Field()
	@Prop()
	observation: string
}

export const OrderModel = getModelForClass(Order, {
	schemaOptions: { timestamps: true },
}) as PaginateModel<Order, typeof Order>
