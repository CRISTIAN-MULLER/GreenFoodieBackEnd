import { Prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'


@ObjectType()
export class Location {

  @Field({ nullable: true })
  @Prop({ default: 'point' })
  type: string

  @Field(() => [Number, Number], { nullable: true })
  @Prop({ type: [Number, Number] })
  coordinates: [number, number]
}


