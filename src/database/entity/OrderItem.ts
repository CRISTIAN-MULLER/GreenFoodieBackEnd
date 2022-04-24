import { Prop, Ref } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'

import Product from './Product'
import SaleUnit from './SaleUnit'

@ObjectType()
export default class OrderItem {
	@Field(() => ID)
	@Prop({ ref: () => Product })
	_id: Ref<Product>

	@Field()
	@Prop()
	name: string

	@Field({ nullable: true })
	@Prop()
	image: string

	@Field(() => SaleUnit)
	@Prop({ type: SaleUnit })
	saleUnit: SaleUnit

	@Field()
	@Prop()
	itemTotalQty: number

	@Field()
	@Prop()
	itemTotalPrice: number
}
