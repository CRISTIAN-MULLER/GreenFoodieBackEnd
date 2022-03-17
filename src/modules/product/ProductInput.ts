import { Field, InputType } from 'type-graphql'
import { SaleUnitInput } from './SaleUnitInput'

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