import { Field, InputType } from 'type-graphql'

@InputType()
export class LocationInput {

  @Field({ nullable: true })
  type: string

  @Field(() => [Number, Number], { nullable: true })
  coordinates: [number, number]
}