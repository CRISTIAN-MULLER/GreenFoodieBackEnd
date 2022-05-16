import { AutoIncrementModel } from '@database/entity/AutoIncrement'

const AutoIncrement = async (modelName: string) => {
	let incrementalModel = await AutoIncrementModel.findOne({
		modelIncrementName: modelName,
	})
	if (!incrementalModel)
		incrementalModel = await AutoIncrementModel.create({
			modelIncrementName: modelName,
		})

	incrementalModel.index += 1
	incrementalModel.save()
	return incrementalModel.index
}

export default AutoIncrement
