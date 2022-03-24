import { UserModel } from './../../database/entity/Users'
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'


@ValidatorConstraint({ async: true })
export class emailExistsConstraint implements ValidatorConstraintInterface {
  validate(email: string) {
    return UserModel.findOne({ 'email': { $eq: email }, }).then(user => {
      if (user) return false
      return true
    })
  }
}

export function emailExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: emailExistsConstraint,
    })
  }
}