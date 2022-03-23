import { mongoose, Prop } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'


@ObjectType()
export class SaleUnit {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId

  @Field({ nullable: true })
  @Prop()
  saleUnit: string

  @Field({ nullable: true })
  @Prop()
  description: string

  @Field({ nullable: true })
  @Prop({ precision: 2, scale: 2 })
  price: number

  @Field()
  @Prop({ default: true })
  active: boolean = true;

  @Field()
  @Prop({ default: false })
  isDefault: boolean = false;
}


