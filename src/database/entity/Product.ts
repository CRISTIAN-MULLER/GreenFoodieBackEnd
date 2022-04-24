import paginationPlugin, { PaginateModel } from 'typegoose-cursor-pagination'

import { getModelForClass, mongoose, Prop, plugin } from '@typegoose/typegoose'
import { IsDefined } from 'class-validator'
import { Field, ID, ObjectType } from 'type-graphql'
import SaleUnit from './SaleUnit'

@plugin(paginationPlugin)
@ObjectType()
export default class Product {
	@Field(() => ID)
	_id: mongoose.Types.ObjectId

	@Field()
	@Prop()
	@IsDefined()
	name: string

	@Field({ nullable: true })
	@Prop()
	@IsDefined()
	description: string

	@Field({ nullable: true })
	@Prop()
	image: string

	@Field(() => [SaleUnit], { nullable: true })
	@Prop({ type: [SaleUnit] })
	saleUnits: SaleUnit[]

	@Field({ nullable: true })
	@Prop()
	category: string

	@Field()
	@Prop({ default: true })
	active: boolean = true
}

export const ProductModel = getModelForClass(Product) as PaginateModel<
	Product,
	typeof Product
>
