import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import bcrypt from 'bcryptjs'
import User, { UserModel } from '@database/entity/Users'
import LoginInput from '@typings/inputs/Login.input'
import ForeignLoginInput from '@typings/inputs/ForeignLogin.input'
import Context from '@typings/interfaces/Context.interface'

@Resolver()
export default class UserLoginResolver {
	@Mutation(() => User, { nullable: true })
	async login(
		@Arg('data') { email, password }: LoginInput,
		@Ctx() ctx: Context,
	): Promise<User | null> {
		const user = (await UserModel.findOne({ email }).lean()) as User

		const isValid = user && (await bcrypt.compare(password, user.password))
		if (!isValid) return null

		ctx.req.session!.userId = user._id

		return user
	}

	@Mutation(() => User, { nullable: true })
	async foreignLogin(
		@Arg('data') { email, foreignId, provider }: ForeignLoginInput,
		@Ctx() ctx: Context,
	): Promise<User | null> {
		const user = (await UserModel.findOne({
			email,
		}).lean()) as User

		const isValid =
			user &&
			user.foreignIds.map(
				(foreign) =>
					foreign.userId === foreignId && foreign.provider === provider,
			)

		if (!isValid) return null

		ctx.req.session!.userId = user._id

		return user
	}
}
