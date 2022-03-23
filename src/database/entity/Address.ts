import { Prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { Location } from './Location'

@ObjectType()
export class Address {

  @Field({ nullable: true })
  @Prop()
  zipcode: string

  @Field({ nullable: true })
  @Prop()
  street: string

  @Field({ nullable: true })
  @Prop()
  houseNumber: string

  @Field({ nullable: true })
  @Prop()
  district: string

  @Field({ nullable: true })
  @Prop()
  city: string

  @Field({ nullable: true })
  @Prop()
  state: string

  @Field({ nullable: true })
  @Prop()
  reference: string

  @Field(() => Location, { nullable: true })
  @Prop()
  location: Location
}


