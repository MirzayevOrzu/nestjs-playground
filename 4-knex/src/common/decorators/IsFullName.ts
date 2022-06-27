import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export const IsFullName = (property: string, validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isFullName',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          return value.split(' ').length === 2;
        },
      },
    });
  };
};
