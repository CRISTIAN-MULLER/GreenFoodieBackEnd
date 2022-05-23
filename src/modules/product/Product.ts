// import { isAuthenticated } from 'src/middlewares/isAuthenticated'
import {
	Arg,
	Field,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	// UseMiddleware
} from 'type-graphql'
import { IPaginateOptions } from 'typegoose-cursor-pagination'

import Paginate from '@database/custom/Pagination'
import Product, { ProductModel } from '@database/entity/Product'

import ProductInput from '@typings/inputs/Product.input'
import PaginationInput from '@typings/inputs/Pagination.input'
import ProductFilter from '@typings/filters/Product.filter'

@ObjectType()
class ProductPaginated extends Paginate {
	@Field(() => [Product])
	products: Product[]
}

@Resolver()
export default class ProductResolver {
	// @UseMiddleware(isAuthenticated)
	@Query(() => ProductPaginated)
	async getAllProducts(
		@Arg('data')
		{
			limit,
			sortAscending,
			sortField,
			nextPage,
			previousPage,
		}: PaginationInput,

		@Arg('filter', { nullable: true }) filters: ProductFilter,
	): Promise<ProductPaginated> {
		const shouldApplyFilters = filters

		const options: IPaginateOptions = {
			sortField,
			sortAscending,
			limit,
			next: nextPage,
			previous: previousPage,
		}
		const query: ProductFilter = {}
		if (shouldApplyFilters) {
			const { status, name, description, categories, _id } = shouldApplyFilters

			if (_id !== undefined) {
				query._id = {
					$in: _id,
				}
			}

			if (status !== undefined) {
				query!.status = status
			}
			if (name !== undefined) {
				query!.name = { $regex: new RegExp(name.toString(), 'i') }
			}
			if (description !== undefined) {
				query!.description = { $regex: new RegExp(description.toString(), 'i') }
			}

			if (categories !== undefined) {
				const match = {
					$in: [/categorie/i],
				}
				match.$in.pop()
				categories.forEach((categorie: string) => {
					match.$in.push(new RegExp(categorie, 'i'))
				})
				query.categories = match
			}
		}

		const response = await ProductModel.findPaged(options, query)

		const products = response.docs
		const hasNext = response.hasNext ? response.hasNext : false
		const hasPrevious = response.hasPrevious ? response.hasPrevious : false
		const next = response.next ? response.next : ''
		const previous = response.previous ? response.previous : ''
		const totalDocs = response.totalDocs ? response.totalDocs : 0

		return {
			products,
			hasNext,
			hasPrevious,
			next,
			previous,
			totalDocs,
		}
	}

	// @UseMiddleware(isAuthenticated)
	@Mutation(() => Product)
	async creatProduct(
		@Arg('data') newProductData: ProductInput,
	): Promise<Product> {
		const product = await ProductModel.create({
			name: newProductData.name,
			description: newProductData.description,
			image: newProductData.image,
			saleUnits: newProductData.saleUnits,
			categories: newProductData.categories,
			status: newProductData.status,
		})
		return product
	}
}
