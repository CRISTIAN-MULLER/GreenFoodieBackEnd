import { Field, InputType } from 'type-graphql'
import { SaleUnitInput } from './SaleUnit.input'

@InputType()
export class ProductInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field()
  image: string

  @Field(() => [SaleUnitInput],)
  saleUnits: SaleUnitInput[]

  @Field()
  category: string

  @Field()
  active: boolean
}