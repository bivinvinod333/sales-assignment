import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions, registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsValidTimeSlotValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const validTimeArray = text.match(/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/);
    return !(validTimeArray === null);

    // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `Time is not in preferred format. Eg" HH:SS (A/P)M`;
  }
}


export function IsValidTimeSlot(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsValidTimeSlotValidator,
    });
  };
}
