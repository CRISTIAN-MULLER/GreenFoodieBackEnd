import ProductFilter from '@typings/filters/Product.filter'
import { Field, InputType } from 'type-graphql'
import SaleUnitInput from './SaleUnit.input'

@InputType()
export default class ProductInput {
	@Field({ nullable: true })
	filters?: ProductFilter

	@Field()
	name: string

	@Field()
	description: string

	@Field()
	image: string

	@Field(() => [SaleUnitInput])
	saleUnits: SaleUnitInput[]

	@Field(() => [String])
	categories: string[]

	@Field(() => String, { nullable: true })
	status: string
}
