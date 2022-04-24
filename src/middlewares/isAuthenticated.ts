import Context from '@typings/interfaces/Context.interface'
import { MiddlewareFn } from 'type-graphql'

const isAuthenticated: MiddlewareFn<Context> = async (
	{ context: { req } },
	next,
) => {
	if (!req.session!.userId) {
		throw new Error('Usuário Não Autenticado')
	}
	return next()
}

export default isAuthenticated
