import { Field, ObjectType } from 'type-graphql'
import { Column } from "typeorm"

import { Location } from './Location'

@ObjectType()
export class Address {

  @Field({ nullable: true })
  @Column()
  zipcode: string

  @Field({ nullable: true })
  @Column()
  street: string

  @Field({ nullable: true })
  @Column()
  houseNumber: string

  @Field({ nullable: true })
  @Column()
  district: string

  @Field({ nullable: true })
  @Column()
  city: string

  @Field({ nullable: true })
  @Column()
  state: string

  @Field({ nullable: true })
  @Column()
  reference: string

  @Field(() => Location, { nullable: true })
  @Column()
  location: Location
}


