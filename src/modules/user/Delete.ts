// import { isAuthenticated } from './../../middlewares/isAuthenticated'
import { Arg, Mutation, Resolver } from 'type-graphql'

import User, { UserModel } from '@database/entity/Users'
import UpdateInput from '@typings/inputs/User.Update.input'

@Resolver()
export default class UserDeleteResolver {
	@Mutation(() => User)
	async deleteAddress(
		@Arg('data') UserData: UpdateInput,
	): Promise<User | null | undefined> {
		const user = await UserModel.findById({ _id: UserData.UserId }).lean()
		if (!user) return null

		const query: any = {}

		if (UserData.address !== undefined) {
			const profileAddresses = user.addresses.filter(
				(address) => address.name !== UserData.address!.name,
			)
			query.addresses = [...profileAddresses]
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
