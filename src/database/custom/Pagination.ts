import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class Paginate {
	@Field({ nullable: true, description: 'true se tiver mais páginas' })
	hasNext: boolean

	@Field({ nullable: true, description: 'true se tiver página anterior' })
	hasPrevious: Boolean

	@Field({
		nullable: true,
		description: 'Cursor para a próxima página',
	})
	next: String

	@Field({
		nullable: true,
		description: 'Cursor para a página anterior',
	})
	previous: String

	@Field({
		nullable: true,
		description:
			'Total de documentos (itens retornados do banco de dados) nessa consulta',
	})
	totalDocs: Number
}
