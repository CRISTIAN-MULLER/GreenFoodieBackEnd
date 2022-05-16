// import { isAuthenticated } from 'src/middlewares/isAuthenticated'
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { IPaginateOptions } from 'typegoose-cursor-pagination'

import Paginate from '@database/custom/Pagination'
import PaginationInput from '@typings/inputs/Pagination.input'
import Order, { OrderModel } from '@database/entity/Order'
import OrderInput from '@typings/inputs/Order.input'
import autoIncrement from '@middlewares/autoIncrement'

@ObjectType()
class OrderPaginated extends Paginate {
	@Field(() => [Order])
	orders: Order[]
}

@Resolver()
export default class OrderResolver {
	// @UseMiddleware(isAuthenticated)
	@Query(() => OrderPaginated)
	async getAllOrders(
		@Arg('data')
		{
			limit,
			sortAscending,
			sortField,
			nextPage,
			previousPage,
		}: PaginationInput,
	): Promise<OrderPaginated> {
		const options: IPaginateOptions = {
			sortField,
			sortAscending,
			limit,
			next: nextPage,
			previous: previousPage,
		}

		const response = await OrderModel.findPaged(options)

		const orders = response.docs
		const hasNext = response.hasNext ? response.hasNext : false
		const hasPrevious = response.hasPrevious ? response.hasPrevious : false
		const next = response.next ? response.next : ''
		const previous = response.previous ? response.previous : ''
		const totalDocs = response.totalDocs ? response.totalDocs : 0

		return {
			orders,
			hasNext,
			hasPrevious,
			next,
			previous,
			totalDocs,
		}
	}

	@Mutation(() => Order)
	async createOrder(@Arg('data') newOrderData: OrderInput): Promise<Order> {
		const order = await OrderModel.create({
			customerId: newOrderData.customerId,
			orderNumber: await autoIncrement('Orders'),
			items: newOrderData.items,
			phone: newOrderData.phone,
			deliveryAddress: newOrderData.deliveryAddress,
			payment: newOrderData.payment,
			origin: newOrderData.origin,
			status: newOrderData.status,
			step: newOrderData.step,
			observation: newOrderData.observation,
		})
		return order
	}
}
