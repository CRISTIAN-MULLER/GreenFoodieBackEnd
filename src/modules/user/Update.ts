// import { isAuthenticated } from './../../middlewares/isAuthenticated'
import { Arg, Mutation, Resolver } from 'type-graphql'
import bcrypt from 'bcryptjs'

import User, { UserModel } from '@database/entity/Users'
import UpdateInput from '@typings/inputs/User.Update.input'

@Resolver()
export default class UserUpdateResolver {
	@Mutation(() => User)
	async updateUser(@Arg('data') UserData: UpdateInput): Promise<User | null> {
		const user = await UserModel.findById({ _id: UserData.UserId }).lean()
		if (!user) return null

		const query: any = {}

		if (UserData.firstName !== undefined) {
			query.firstName = UserData.firstName
		}
		if (UserData.lastName !== undefined) {
			query.lastName = UserData.lastName
		}
		if (UserData.email !== undefined) {
			query.email = UserData.email
		}
		if (UserData.password !== undefined) {
			const hashedPassword = await bcrypt.hash(UserData.password, 12)
			query.password = hashedPassword
		}
		if (UserData.phone !== undefined) {
			query.phone = UserData.phone
		}
		if (UserData.profilePicture !== undefined) {
			query.profilePicture = UserData.profilePicture
		}

		if (UserData.role !== undefined) {
			query.role = UserData.role
		}

		if (UserData.address !== undefined) {
			const index = user!.addresses.findIndex(
				(address) => address.name === UserData.address!.name,
			)
			if (index !== -1) {
				user.addresses[index] = UserData.address
			} else {
				user.addresses.push(UserData.address)
			}

			query.addresses = user.addresses
		}

		if (UserData.paymentMethod !== undefined) {
			const index = user.paymentMethods.findIndex(
				(card) => card.cardName === UserData.paymentMethod!.cardName,
			)
			if (index !== -1) {
				user.paymentMethods[index] = UserData.paymentMethod
			} else {
				user.paymentMethods.push(UserData.paymentMethod)
			}
			query.paymentMethods = user.paymentMethods
		}

		if (UserData.favoriteProducts !== undefined) {
			query.favoriteProducts = UserData.favoriteProducts
		}

		const returnedUser = await UserModel.findOneAndUpdate(
			{ _id: UserData.UserId },
			query,
			{
				new: true,
			},
		).lean()
		if (!returnedUser) return null
		return returnedUser
	}
}
