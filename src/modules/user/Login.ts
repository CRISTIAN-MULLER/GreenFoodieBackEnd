
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import bcrypt from 'bcryptjs'
import { User } from '@database/entity/Users'
import { LoginInput } from './LoginInput'
import Context from 'src/types/Context'

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('data') { email, password }: LoginInput,
    @Ctx() ctx: Context,
  ): Promise<User | null> {

    const user = await User.findOne({ where: { email } })
    const isValid = user && await bcrypt.compare(password, user.password)
    if (!isValid) return null

    //@ts-ignore
    ctx.req.session.userId = user._id

    return user
  }
}