import paginationPlugin, { PaginateModel } from 'typegoose-cursor-pagination'
import { getModelForClass, mongoose, plugin, Prop } from '@typegoose/typegoose'
import { IsDefined } from 'class-validator'
import { Field, ID, ObjectType } from 'type-graphql'
import Address from './Address'
import ForeignId from './ForeignId'
import CardInfo from './CardInfo'
import Product from './Product'

@plugin(paginationPlugin)
@ObjectType()
export default class User {
	@Field(() => ID)
	_id: mongoose.Types.ObjectId

	@Field(() => [ForeignId], { nullable: true })
	@Prop({ type: [ForeignId], _id: false })
	foreignIds: ForeignId[]

	@Field({ nullable: true })
	@Prop()
	@IsDefined()
	firstName: string

	@Field()
	@Prop()
	@IsDefined()
	lastName: string

	@Field(() => String, { nullable: true })
	fullName(): string {
		return `${this.firstName} ${this.lastName}`
	}

	@Field()
	@Prop({ unique: true })
	@IsDefined()
	email: string

	@Prop()
	@IsDefined()
	password: string

	@Field({ nullable: true })
	@Prop()
	phone: string

	@Field({ nullable: true })
	@Prop()
	profilePicture: string

	@Field({ nullable: true })
	@Prop()
	role: string

	@Field(() => [Address], { nullable: true })
	@Prop({ type: [Address] })
	addresses: Address[]

	@Field(() => [CardInfo], { nullable: true })
	@Prop({ type: [CardInfo] })
	paymentMethods: CardInfo[]

	@Field(() => [String])
	@Prop({ ref: () => Product })
	favoriteProducts: mongoose.Types.ObjectId[]

	@Prop({ default: false })
	emailConfirmed: boolean
}

export const UserModel = getModelForClass(User, {
	schemaOptions: { timestamps: true },
}) as PaginateModel<User, typeof User>
