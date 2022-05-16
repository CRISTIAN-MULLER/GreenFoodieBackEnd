import { getModelForClass, Prop } from '@typegoose/typegoose'
import { ObjectType } from 'type-graphql'

@ObjectType()
export class AutoIncrement {
	@Prop({ type: String, required: true, index: true })
	modelIncrementName: string

	@Prop({ type: Number, default: 0 })
	index: number
}

export const AutoIncrementModel = getModelForClass(AutoIncrement)
