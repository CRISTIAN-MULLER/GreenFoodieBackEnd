import { Prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class PaymentMethod {
  @Field({ nullable: true })
  @Prop()
  cardName: string

  @Field({ nullable: true })
  @Prop()
  cardHolderName: string

  @Field({ nullable: true })
  @Prop()
  cardNumber: string

  @Field({ nullable: true })
  @Prop()
  expirationDate: string

  @Field({ nullable: true })
  @Prop()
  cardBrand: string

  @Field({ nullable: true })
  @Prop()
  cvv: string
}


