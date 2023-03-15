import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import bcrypt from 'bcryptjs';
import User, { UserModel } from '@database/entity/Users';
import LoginInput from '@typings/inputs/Login.input';
import ForeignLoginInput from '@typings/inputs/ForeignLogin.input';
import Context from '@typings/interfaces/Context.interface';

@Resolver()
export default class UserLoginResolver {
	@Mutation(() => User, { nullable: true })
	async login(
		@Arg('data') { email, password }: LoginInput,
		@Ctx() ctx: Context
	): Promise<User | null> {
		const user = (await UserModel.findOne({ email }).lean()) as User;

		const isValid = user && (await bcrypt.compare(password, user.password));
		if (!isValid) return null;
		ctx.req.session!.userId = user._id;
		return user;
	}

	@Mutation(() => User, { nullable: true })
	async foreignLogin(
		@Arg('data')
		{
			firstName,
			lastName,
			email,
			foreignId,
			profilePicture
		}: ForeignLoginInput,
		@Ctx() ctx: Context
	): Promise<User | null> {
		let user = (await UserModel.findOne({
			email
		}).lean()) as User;

		if (!user) {
			const newUser = await UserModel.create({
				firstName,
				lastName,
				email,
				profilePicture,
				foreignIds: [foreignId]
			});
			await newUser.toObject();
			// await sendEmail( email )
			user = newUser;
		}

		if (user) {
			let foreignIds;

			if (!user.foreignIds) {
				foreignIds = [];
				foreignIds.push(foreignId);
			}

			if (user.foreignIds) {
				foreignIds = user.foreignIds?.filter(
					(foreign) => foreign.provider !== foreignId.provider
				);
				foreignIds.push(foreignId);
			}
			const returnedUser = await UserModel.findOneAndUpdate(
				{ _id: user._id },
				{
					firstName,
					lastName,
					email,
					profilePicture,
					foreignIds
				},
				{
					new: true
				}
			).lean();
			if (!returnedUser) return null;
			user = returnedUser;
		}
		ctx.req.session!.userId = user._id;
		return user;
	}
}
