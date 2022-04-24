import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator'
import { UserModel } from '@database/entity/Users'

@ValidatorConstraint({ async: true })
export class emailExistsConstraint implements ValidatorConstraintInterface {
	validate(email: string) {
		return UserModel.findOne({ email: { $eq: email } }).then((user) => {
			if (user) return false
			return true
		})
	}
}

export function emailExists(validationOptions?: ValidationOptions) {
	return (object: Object, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [],
			validator: emailExistsConstraint,
		})
	}
}
