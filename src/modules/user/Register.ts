//import { isAuthenticated } from './../../middlewares/isAuthenticated'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'

import bcrypt from 'bcryptjs'
import { User } from '../../database/entity/Users'
import { RegisterInput } from './RegisterInput'


@Resolver()
export class RegisterResolver {
  // @UseMiddleware(isAuthenticated)
  @Query(() => String)
  async hello() {
    return "Hello word"
  }
  @Mutation(() => User)
  async registerUser(
    @Arg('data') { firstName, lastName, email, password }: RegisterInput,
  ): Promise<User> {

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save()

    //await sendEmail( email )

    return user
  }
}