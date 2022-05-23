import { Length, IsEmail } from 'class-validator'
import { Field, ID, InputType } from 'type-graphql'
import CardInfo from '@database/entity/CardInfo'
import Address from '@database/entity/Address'

import Product from '@database/entity/Product'
import { Ref } from '@typegoose/typegoose'
import { emailExists } from '../../modules/user/emailExistsValidator'
import AddressInput from './Address.input'

@InputType()
export default class UserUpdateInput {
	@Field()
	UserId: string

	@Field({ nullable: true })
	@Length(1, 40)
	firstName?: string

	@Field({ nullable: true })
	@Length(1, 40)
	lastName?: string

	@Field({ nullable: true })
	@IsEmail()
	@emailExists({ message: 'Email já está em uso' })
	email?: string

	@Field({ nullable: true })
	password?: string

	@Field({ nullable: true })
	phone?: string

	@Field({ nullable: true })
	profilePicture?: string

	@Field({ nullable: true })
	role?: string

	@Field(() => CardInfo, { nullable: true })
	paymentMethod?: CardInfo

	@Field(() => AddressInput, { nullable: true })
	address?: Address

	@Field(() => [ID], { nullable: true })
	favoriteProducts?: [Ref<Product>]
}
