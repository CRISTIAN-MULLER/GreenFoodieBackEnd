import { Length, IsEmail } from "class-validator"
import { Field, InputType } from 'type-graphql'
import { emailExists } from './emailExistsValidator'

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
}