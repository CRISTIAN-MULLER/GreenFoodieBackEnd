import paginationPlugin, { PaginateModel } from 'typegoose-cursor-pagination'

import { getModelForClass, mongoose, Prop, plugin } from '@typegoose/typegoose'
import { IsDefined } from 'class-validator'
import { Field, ID, ObjectType } from 'type-graphql'

import SaleUnit from './SaleUnit'

@plugin(paginationPlugin)
@ObjectType()
export default class Product {
	@Field(() => ID)
	// @Prop()
	_id: mongoose.Types.ObjectId

	@Field()
	@Prop()
	@IsDefined()
	name: string

	@Field()
	@Prop()
	@IsDefined()
	description: string

	@Field({ nullable: true })
	@Prop()
	image: string

	@Field(() => [SaleUnit], { nullable: true })
	@Prop({ type: [SaleUnit] })
	saleUnits: SaleUnit[]

	@Field(() => [String], { nullable: true })
	@Prop()
	categories: string[]

	@Field()
	@Prop({ type: String, default: 'ativo' })
	status: string
}

export const ProductModel = getModelForClass(Product) as PaginateModel<
	Product,
	typeof Product
>
