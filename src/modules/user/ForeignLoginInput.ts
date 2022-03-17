import { Field, InputType } from 'type-graphql'

@InputType()
export class ForeignLoginInput {
  @Field()
  email: string

  @Field()
  foreignId: string

  @Field()
  provider: string
}