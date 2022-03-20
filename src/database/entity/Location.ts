import { Field, ObjectType } from 'type-graphql'
import { Column } from "typeorm"

@ObjectType()
export class Location {

  @Field({ nullable: true })
  @Column({ default: 'point' })
  type: string

  @Field(() => [Number, Number], { nullable: true })
  @Column()
  coordinates: [number, number]
}


