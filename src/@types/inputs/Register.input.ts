import { Length, IsEmail } from "class-validator"
import { Field, InputType } from 'type-graphql'
import { emailExists } from '../../modules/user/emailExistsValidator'
import { AddressInput } from './Address.input'

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 40)
  firstName: string

  @Field()
  @Length(1, 40)
  lastName: string

  @Field()
  @IsEmail()
  @emailExists({ message: "Email já está em uso" })
  email: string

  @Field()
  password: string

  @Field({ nullable: true })
  phone?: string

  @Field(() => [AddressInput], { nullable: true })
  addresses: AddressInput[]
}