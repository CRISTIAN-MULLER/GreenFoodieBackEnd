// import { isAuthenticated } from 'src/middlewares/isAuthenticated'
import { Arg, Field, ObjectType, Query, Resolver } from 'type-graphql'
import { IPaginateOptions } from 'typegoose-cursor-pagination'

import Paginate from '@database/custom/Pagination'
import PaginationInput from '@typings/inputs/Pagination.input'
import User, { UserModel } from '@database/entity/Users'
import UserFilter from '@typings/filters/User.filter'

@ObjectType()
class UserPaginated extends Paginate {
	@Field(() => [User])
	users: User[]
}

@Resolver()
export default class UserListResolver {
	// @UseMiddleware(isAuthenticated)
	@Query(() => UserPaginated)
	async getAllUsers(
		@Arg('data')
		{
			limit,
			sortAscending,
			sortField,
			nextPage,
			previousPage,
		}: PaginationInput,

		@Arg('filter', { nullable: true }) filters: UserFilter,
	): Promise<UserPaginated> {
		const shouldApplyFilters = filters

		console.warn(shouldApplyFilters)

		const options: IPaginateOptions = {
			sortField,
			sortAscending,
			limit,
			next: nextPage,
			previous: previousPage,
		}

		const query: UserFilter = {}
		if (shouldApplyFilters) {
			const { firstName, _id, email, phone } = shouldApplyFilters

			if (_id !== undefined) {
				query._id = {
					$in: _id,
				}
			}

			if (firstName !== undefined) {
				query!.firstName = { $regex: new RegExp(firstName.toString(), 'i') }
			}

			if (email !== undefined) {
				query!.email = { $regex: new RegExp(email.toString(), 'i') }
			}

			if (phone !== undefined) {
				query!.phone = { $regex: new RegExp(phone.toString(), 'i') }
			}
		}

		console.log(query)

		const response = await UserModel.findPaged(options, { query, lean: true })

		console.log(response.docs)
		const users = response.docs
		const hasNext = response.hasNext ? response.hasNext : false
		const hasPrevious = response.hasPrevious ? response.hasPrevious : false
		const next = response.next ? response.next : ''
		const previous = response.previous ? response.previous : ''
		const totalDocs = response.totalDocs ? response.totalDocs : 0

		return {
			users,
			hasNext,
			hasPrevious,
			next,
			previous,
			totalDocs,
		}
	}
}
