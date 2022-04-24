import { mongoose } from '@typegoose/typegoose'
import { Field, ID, InputType } from 'type-graphql'

import SaleUnitInput from './SaleUnit.input'

@InputType()
export default class OrderItemInput {
	@Field(() => ID)
	_id: mongoose.Types.ObjectId

	@Field()
	name: string

	@Field({ nullable: true })
	image: string

	@Field(() => SaleUnitInput)
	saleUnit: SaleUnitInput

	@Field()
	itemTotalQty: number

	@Field()
	itemTotalPrice: number
}
