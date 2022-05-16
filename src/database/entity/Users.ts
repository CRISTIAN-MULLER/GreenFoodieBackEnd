import { getModelForClass, mongoose, Prop } from '@typegoose/typegoose'
import { IsDefined } from 'class-validator'
import { Field, ID, ObjectType } from 'type-graphql'
import Address from './Address'
import ForeignId from './ForeignId'
import CardInfo from './CardInfo'

@ObjectType()
export class User {
	@Field(() => ID)
	@Prop()
	_id: mongoose.Types.ObjectId

	@Field(() => ForeignId, { nullable: true })
	@Prop({ type: ForeignId })
	foreignIds: ForeignId[]

	@Field({ nullable: true })
	@Prop()
	@IsDefined()
	firstName: string

	@Field()
	@Prop()
	@IsDefined()
	lastName: string

	@Field()
	fullName(): String {
		const { firstName } = this

		console.log(firstName)
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

	@Prop({ default: false })
	emailConfirmed: boolean
}

export const UserModel = getModelForClass(User)
