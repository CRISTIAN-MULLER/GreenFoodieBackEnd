//import { isAuthenticated } from 'src/middlewares/isAuthenticated'
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  //UseMiddleware
} from 'type-graphql'
import { IPaginateOptions } from 'typegoose-cursor-pagination'


import { Paginate } from '@database/custom/Pagination'
import { ProductModel, Product } from '@database/entity/Product'
import { ProductInput } from '../../@types/inputs/Product.input'
import { PaginationInput } from '../../@types/inputs/Pagination.input'


@ObjectType()
class ProductPaginated extends Paginate {
  @Field(() => [Product])
  products: Product[]
}

@Resolver()
export class GetProductResolver {
  //@UseMiddleware(isAuthenticated)
  @Query(() => ProductPaginated)
  async getAllProducts(
    @Arg('data') { limit, sortAscending, sortField, nextPage, previousPage }: PaginationInput,
  ): Promise<ProductPaginated> {

    const options: IPaginateOptions = {
      sortField: sortField,
      sortAscending: sortAscending,
      limit: limit,
      next: nextPage,
      previous: previousPage
    }

    const response = await ProductModel.findPaged(options)

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
      totalDocs
    }
  }

  //@UseMiddleware(isAuthenticated)
  @Mutation(() => Product)
  async creatProduct(
    @Arg('data') newProductData: ProductInput
  ): Promise<Product> {
    const product = await ProductModel.create({
      name: newProductData.name,
      description: newProductData.description,
      image: newProductData.image,
      saleUnits: newProductData.saleUnits,
      category: newProductData.category,
      active: newProductData.active,
    })
    return product
  }

}