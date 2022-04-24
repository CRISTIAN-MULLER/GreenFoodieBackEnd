import { Field, InputType } from 'type-graphql'

@InputType()
export default class PaginationInput {
	@Field({ nullable: true })
	limit?: number

	@Field({ nullable: true })
	nextPage?: string

	@Field({ nullable: true })
	sortField?: string

	@Field({
		nullable: true,
		description: "if true return 'asc', if not, return 'desc'",
	})
	sortAscending?: Boolean

	@Field({ nullable: true })
	previousPage?: string
}
