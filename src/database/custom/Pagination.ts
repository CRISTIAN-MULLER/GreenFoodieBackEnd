import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Paginate {
  @Field({ nullable: true, description: 'true if has more pages to query' })
  hasNext: boolean

  @Field({ nullable: true, description: 'true if has previous pages to query' })
  hasPrevious: Boolean

  @Field({ nullable: true, description: 'next is the cursor for the next page' })
  next: String // next page is the cursor for the next page

  @Field({ nullable: true, description: 'previous is the cursor for the previous page' })
  previous: String // previous is the cursor for the previous page

  @Field({ nullable: true, description: 'previous is the cursor for the previous page' })
  totalDocs: Number // totalDocs is the total amount of docs for the query
}