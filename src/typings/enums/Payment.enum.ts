import { registerEnumType } from 'type-graphql'

export enum PAYMENT_STATUS {
	PAID = 'paid',
	TO_PAY = 'to_pay',
	PENDING = 'pending',
	CANCELED = 'canceled',
}

registerEnumType(PAYMENT_STATUS, {
	name: 'PAYMENT_STATUS', // this one is mandatory
	description: 'informa o status do pagamento do pedido', // this one is optional
})
