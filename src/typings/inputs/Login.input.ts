import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class LoginInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	email: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	password: string;
}
