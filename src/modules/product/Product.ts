import { Product } from '@database/entity/Product'
import { isAuthenticated } from 'src/middlewares/isAuthenticated'
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { getMongoRepository } from 'typeorm'
import { ProductInput } from './ProductInput'

@Resolver()
export class GetProductResolver {
  //@UseMiddleware(isAuthenticated)
  @Query(() => [Product])
  async getAllProducts() {
    const product = await getMongoRepository(Product).find()
    return product
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => Product)
  async creatProduct(
    @Arg('data') newProductData: ProductInput
  ): Promise<Product> {
    const product = await Product.create({
      name: newProductData.name,
      description: newProductData.description,
      image: newProductData.image,
      saleUnits: newProductData.saleUnits,
      category: newProductData.category,
      active: newProductData.active,
    }).save()
    return product
  }

}