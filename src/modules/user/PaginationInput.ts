import { Field, InputType } from 'type-graphql'

@InputType()
export class PaginationInput {
  @Field()
  limit: number

  @Field()
  cursor: number

}