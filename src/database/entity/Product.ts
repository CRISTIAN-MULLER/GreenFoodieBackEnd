
import { IsDefined } from 'class-validator'
import { Field, ID, ObjectType } from 'type-graphql'
import { Entity, Column, ObjectIdColumn, BaseEntity, ObjectID } from "typeorm"
import { SaleUnit } from './SaleUnit'


@ObjectType()
@Entity("Products")
export class Product extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID

  @Field()
  @Column()
  @IsDefined()
  name: string

  @Field({ nullable: true })
  @Column()
  @IsDefined()
  description: string

  @Field({ nullable: true })
  @Column()
  image: string

  @Field(() => [SaleUnit], { nullable: true })
  @Column()
  saleUnits: SaleUnit[]

  @Field({ nullable: true })
  @Column()
  category: string

  @Field()
  @Column('boolean', { default: true })
  active: boolean = true;
}







