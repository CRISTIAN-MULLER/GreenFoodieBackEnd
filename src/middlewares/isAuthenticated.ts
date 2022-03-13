import Context from 'src/types/Context'
import { MiddlewareFn } from 'type-graphql'


export const isAuthenticated: MiddlewareFn<Context> = async ({ context: { req } }, next) => {
  //@ts-ignore
  if (!req.session!.userId)
  {
    throw new Error("Usuário Não Autenticado")
  }
  return next()
}