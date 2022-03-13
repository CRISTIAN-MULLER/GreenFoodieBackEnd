import { Ctx, Query, Resolver } from 'type-graphql'
import { User } from '../../database/entity/Users'
import Context from 'src/types/Context'
import { getMongoRepository } from 'typeorm'


@Resolver()
export class GetUserResolver {
  @Query(() => User, { nullable: true })
  async logedUser(@Ctx() ctx: Context): Promise<User | undefined> {
    //@ts-ignore
    if (!ctx.req.session!.userId)
    {
      return undefined
    }
    //@ts-ignore
    const user = getMongoRepository(User).findOne(ctx.req.session!.userId)

    return user
  }

}