import { UserModel } from '../../database/entity/Users'
//import { isAuthenticated } from './../../middlewares/isAuthenticated'
import {
  Arg,
  Mutation,
  Query,
  Resolver
} from 'type-graphql'

import bcrypt from 'bcryptjs'
import { User } from '../../database/entity/Users'
import { RegisterInput } from '../../@types/inputs/Register.input'


@Resolver()
export class RegisterResolver {
  // @UseMiddleware(isAuthenticated)
  @Query(() => String)
  async hello() {
    return "Hello word"
  }
  @Mutation(() => User)
  async registerUser(
    @Arg('data') { firstName, lastName, email, password, phone, addresses }: RegisterInput,
  ): Promise<User> {

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      phone,
      addresses,
      password: hashedPassword
    })

    //await sendEmail( email )

    return user
  }
}