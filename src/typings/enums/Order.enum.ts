import { registerEnumType } from 'type-graphql'

export enum ORDER_ORIGIN {
	APP = 'app',
	WEB = 'web',
	COUNTER = 'counter',
}

export enum ORDER_STATUS {
	ORDER_PLACED = 'order_placed',
	CONFIRMED = 'confirmed',
	IN_PROGRESS = 'in_progress',
	OUT_FOR_DELIVERY = 'out_for_delivery',
	DELIVERED = 'delivered',
	CANCELED = 'canceled',
}

registerEnumType(ORDER_ORIGIN, {
	name: 'ORDER_ORIGIN', // this one is mandatory
	description: 'Informa a origem do pedido', // this one is optional
})

registerEnumType(ORDER_STATUS, {
	name: 'ORDER_STATUS', // this one is mandatory
	description: 'informa o status do pedido', // this one is optional
})
