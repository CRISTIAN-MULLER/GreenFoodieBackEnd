import { Ctx, Query, Resolver } from 'type-graphql'
import { User, UserModel } from '../../database/entity/Users'
import Context from '../../@types/interfaces/Context.interface'

//import { isAuthenticated } from 'src/middlewares/isAuthenticated'

@Resolver()
export class GetUserResolver {
  //@UseMiddleware(isAuthenticated)
  @Query(() => User, { nullable: true })
  async logedUser(@Ctx() ctx: Context): Promise<User | null> {
    const user = UserModel.findOne(ctx.req.session!.userId)
    if (!user) return null
    return user

  }
}