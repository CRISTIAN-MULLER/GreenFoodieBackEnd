
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'

import bcrypt from 'bcryptjs'
import { User } from '@database/entity/Users'
import { LoginInput } from './LoginInput'
import { ForeignLoginInput } from './ForeignLoginInput'
import Context from 'src/types/Context'
import { getMongoRepository } from 'typeorm'

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
  @Mutation(() => User, { nullable: true })
  async foreignLogin(
    @Arg('data') { email, foreignId, provider }: ForeignLoginInput,
    @Ctx() ctx: Context,
  ): Promise<User | null> {

    const user = await await getMongoRepository(User).findOne({
      where: {
        'email': { $eq: email },
        'foreignIds.id': { $eq: foreignId },
        'foreignIds.provider': { $eq: provider },
      }
    })

    if (!user) return null

    //@ts-ignore
    ctx.req.session.userId = user._id

    return user
  }
}