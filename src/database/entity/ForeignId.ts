import { Field, ObjectType } from 'type-graphql'
import { Column } from "typeorm"

@ObjectType()
export class ForeignId {

  @Field({ nullable: true })
  @Column()
  id: string

  @Field({ nullable: true })
  @Column()
  provider: string

}
