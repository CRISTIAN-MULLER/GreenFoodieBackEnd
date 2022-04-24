import { Ctx, Mutation, Resolver } from 'type-graphql'
import Context from '@typings/interfaces/Context.interface'

@Resolver()
export default class LogoutResolver {
	@Mutation(() => Boolean)
	async logout(@Ctx() ctx: Context): Promise<boolean> {
		return new Promise((resolve, reject) => {
			ctx.req.session!.destroy((error) => {
				if (error) {
					console.warn(error)
					return reject(false)
				}
				try {
					ctx.res.clearCookie('qid', {
						path: '/',
						domain: 'localhost ',
						httpOnly: true,
						sameSite: 'none',
						secure: true,
					})
				} catch (err) {
					console.warn(err)
				}
				return resolve(true)
			})
		})
	}
}
