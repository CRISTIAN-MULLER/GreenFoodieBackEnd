import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { User } from '../../database/entity/Users'
import Context from 'src/types/Context'
import { getMongoRepository } from 'typeorm'
import { isAuthenticated } from 'src/middlewares/isAuthenticated'


@Resolver()
export class GetUserResolver {
  @UseMiddleware(isAuthenticated)
  @Query(() => User, { nullable: true })
  async logedUser(@Ctx() ctx: Context): Promise<User | undefined> {
    //@ts-ignore
    const user = getMongoRepository(User).findOne(ctx.req.session!.userId)

    return user
  }

}