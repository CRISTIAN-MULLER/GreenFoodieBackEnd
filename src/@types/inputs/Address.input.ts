import { Field, InputType } from 'type-graphql'
import { LocationInput } from './Location.input'

@InputType()
export class AddressInput {

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  zipcode: string

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