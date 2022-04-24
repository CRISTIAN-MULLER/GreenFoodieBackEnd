import { Field, InputType } from 'type-graphql'

@InputType()
export default class SaleUnitInput {
	@Field()
	saleUnit: string

	@Field()
	description: string

	@Field()
	price: number

	@Field()
	active: boolean
}
