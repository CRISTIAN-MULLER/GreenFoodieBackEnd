import { Field, ObjectType } from 'type-graphql'
import { Column } from "typeorm"

@ObjectType()
export class SaleUnit {
  @Field({ nullable: true })
  @Column()
  saleUnit: string

  @Field({ nullable: true })
  @Column()
  description: string

  @Field({ nullable: true })
  @Column("decimal", { precision: 2, scale: 2 })
  price: number

  @Field()
  @Column('boolean', { default: true })
  active: boolean = true;
}


