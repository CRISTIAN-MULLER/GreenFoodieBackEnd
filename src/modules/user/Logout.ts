
import { Ctx, Mutation, Resolver } from 'type-graphql'
import Context from '../../@types/interfaces/Context.interface'

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<boolean> {
    return new Promise((res, rej) => ctx.req.session!.destroy((error) => {
      if (error)
      {
        console.warn(error)
        return rej(false)
      }
      try
      {
        ctx.res.clearCookie("qid", {
          path: '/',
          domain: "localhost ",
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })

      } catch (error)
      {
        console.warn(error)
      }

      return res(true)
    })
    )
  }

}