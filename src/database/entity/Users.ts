import { getModelForClass, mongoose, Prop } from '@typegoose/typegoose'
import { IsDefined } from 'class-validator'
import { Field, ID, ObjectType, Root } from 'type-graphql'
import { Address } from './Address'
import { ForeignId } from './ForeignId'


@ObjectType()
export class User {
  @Field(() => ID)
  @Prop()
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
    return `${parent.firstName} ${parent.lastName}`
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

  @Field(() => Address, { nullable: true })
  @Prop()
  address: Address

  @Prop({ default: false })
  emailConfirmed: boolean
}

export const UserModel = getModelForClass(User)