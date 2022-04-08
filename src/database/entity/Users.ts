import { getModelForClass, mongoose, Prop } from '@typegoose/typegoose'
import { IsDefined } from 'class-validator'
import { Field, ID, ObjectType, Root } from 'type-graphql'
import { Address } from './Address'
import { ForeignId } from './ForeignId'
import { PaymentMethod } from './PaymentMethod'


@ObjectType()
export class User {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId

  @Field(() => ForeignId, { nullable: true })
  @Prop({ type: ForeignId })
  foreignIds: ForeignId[]

  @Field({ nullable: true })
  @Prop()
  @IsDefined()
  firstName: string

  @Field()
  @Prop()
  @IsDefined()
  lastName: string

  @Field()
  fullName(@Root() parent: User): string {
    return `${this.firstName} ${parent.lastName}`
  }

  @Field()
  @Prop({ unique: true })
  @IsDefined()
  email: string

  @Prop()
  @IsDefined()
  password: string

  @Field({ nullable: true })
  @Prop()
  phone: string

  @Field({ nullable: true })
  @Prop()
  profile_picture: string

  @Field({ nullable: true })
  @Prop()
  role: string

  @Field(() => [Address], { nullable: true })
  @Prop({ type: [Address] })
  addresses: Address[]


  @Field(() => [PaymentMethod], { nullable: true })
  @Prop({ type: [PaymentMethod] })
  paymentMethods: PaymentMethod[]


  @Prop({ default: false })
  emailConfirmed: boolean
}

export const UserModel = getModelForClass(User)