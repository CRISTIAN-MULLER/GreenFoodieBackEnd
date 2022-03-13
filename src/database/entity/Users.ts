import { IsDefined } from 'class-validator'
import { Field, ObjectType, Root } from 'type-graphql'
import { Entity, Column, ObjectIdColumn, BaseEntity, ObjectID } from "typeorm"




@ObjectType()
@Entity("Users")
export class User extends BaseEntity {


  @ObjectIdColumn()
  _id: ObjectID

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



  // phone: { type: String, required: true },
  // address: {
  //   zipcode: { type: String, required: false },
  //   street: { type: String, required: false },
  //   houseNumber: { type: Number, required: false },
  //   district: { type: String, required: false },
  //   city: { type: String, required: false },
  //   state: { type: String, required: false },
  //   reference: { type: String, required: false },
  // },
  // password: { type: String, required: false },
  // role: { type: String, default: 'customer' },

  @Column("bool", { default: false })
  emailConfirmed: boolean

}


