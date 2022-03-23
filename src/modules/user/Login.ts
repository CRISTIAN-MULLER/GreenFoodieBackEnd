
import {
  Arg,
  Ctx,
  Mutation,
  Resolver
} from 'type-graphql'

import bcrypt from 'bcryptjs'
import { User, UserModel } from '@database/entity/Users'
import { LoginInput } from '../../@types/inputs/Login.input'
import { ForeignLoginInput } from '../../@types/inputs/ForeignLogin.input'
import Context from '../../@types/interfaces/Context.interface'


@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('data') { email, password }: LoginInput,
    @Ctx() ctx: Context,
  ): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } })
    const isValid = user && await bcrypt.compare(password, user.password)
    if (!isValid) return null

    ctx.req.session!.userId = user._id

    return user
  }
  @Mutation(() => User, { nullable: true })
  async foreignLogin(
    @Arg('data') { email, foreignId, provider }: ForeignLoginInput,
    @Ctx() ctx: Context,
  ): Promise<User | null> {

    const user = await UserModel.findOne({
      where: {
        'email': { $eq: email },
        'foreignIds.id': { $eq: foreignId },
        'foreignIds.provider': { $eq: provider },
      }
    })

    if (!user) return null

    ctx.req.session!.userId = user._id

    return user
  }
}