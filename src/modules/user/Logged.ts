import { Ctx, Query, Resolver } from 'type-graphql'
import Context from '@typings/interfaces/Context.interface'
import User, { UserModel } from '@database/entity/Users'

// import { isAuthenticated } from 'src/middlewares/isAuthenticated'

@Resolver(User)
export default class UserLoggedResolver {
	// @UseMiddleware(isAuthenticated)
	@Query(() => User, { nullable: true })
	async getLoggedUser(@Ctx() ctx: Context): Promise<User | null | undefined> {
		const user = (await UserModel.findById(
			ctx.req.session!.userId,
		).lean()) as User
		if (!user) return null
		return user
	}
}
