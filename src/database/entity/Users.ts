import { IsDefined } from 'class-validator'
import { Field, ObjectType, Root } from 'type-graphql'
import { Entity, Column, ObjectIdColumn, BaseEntity, ObjectID } from "typeorm"
import { Address } from './Address'
import { ForeignId } from './ForeignId'


@ObjectType()
@Entity("Users")
export class User extends BaseEntity {

  @ObjectIdColumn()
  _id: ObjectID

  @Field(() => ForeignId, { nullable: true })
  @Column()
  foreignIds: ForeignId[]

  @Field({ nullable: true })
  @Column()
  @IsDefined()
  firstName: string

  @Field()
  @Column()
  @IsDefined()
  lastName: string

  @Field()
  fullName(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`
  }

  @Field()
  @Column("text", { unique: true })
  @IsDefined()
  email: string

  @Column()
  @IsDefined()
  password: string

  @Field({ nullable: true })
  @Column()
  phone: string

  @Field({ nullable: true })
  @Column()
  profile_picture: string

  @Field({ nullable: true })
  @Column()
  role: string

  @Field(() => Address, { nullable: true })
  @Column()
  address: Address

  @Column("boolean", { default: false })
  emailConfirmed: boolean
}