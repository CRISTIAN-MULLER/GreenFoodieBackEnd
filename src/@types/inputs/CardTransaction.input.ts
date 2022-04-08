import { Field, InputType } from 'type-graphql'
import { LocationInput } from './Location.input'

@InputType()
export class CardTransactionInput {

  @Field({ nullable: true })
  amount: string

  @Field({ nullable: true })
  card_holder_name: string

  @Field({ nullable: true })
  street: string

  @Field({ nullable: true })
  houseNumber: string

  @Field({ nullable: true })
  district: string

  @Field({ nullable: true })
  city: string

  @Field({ nullable: true })
  state: string

  @Field({ nullable: true })
  reference: string

  @Field(() => LocationInput, { nullable: true })
  location: LocationInput


}