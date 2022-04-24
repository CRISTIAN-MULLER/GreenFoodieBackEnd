import { Ctx, Query, Resolver } from 'type-graphql'
import Context from '@typings/interfaces/Context.interface'
import { User, UserModel } from '../../database/entity/Users'

// import { isAuthenticated } from 'src/middlewares/isAuthenticated'

@Resolver()
export default class LoggedUserResolver {
	// @UseMiddleware(isAuthenticated)
	@Query(() => User, { nullable: true })
	async getLoggedUser(@Ctx() ctx: Context): Promise<User | null> {
		const user = UserModel.findOne(ctx.req.session!.userId)
		if (!user) return null
		return user
	}
}
