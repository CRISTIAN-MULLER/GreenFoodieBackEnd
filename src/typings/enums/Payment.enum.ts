import { registerEnumType } from 'type-graphql'

export enum PAYMENT_METHOD {
	CREDIT_CARD = 'credit_card',
	DEBIT_CARD = 'debit_card',
	CASH_ON_DELIVERY = 'cash_on_delivery',
}

export enum PAYMENT_STATUS {
	PAID = 'paid',
	TO_PAY = 'to_pay',
	PENDING = 'pending',
	CANCELED = 'canceled',
}

registerEnumType(PAYMENT_METHOD, {
	name: 'PAYMENT_METHOD', // this one is mandatory
	description: 'Informa o método de pagamento do pedido', // this one is optional
})

registerEnumType(PAYMENT_STATUS, {
	name: 'PAYMENT_STATUS', // this one is mandatory
	description: 'informa o status do pagamento do pedido', // this one is optional
})
