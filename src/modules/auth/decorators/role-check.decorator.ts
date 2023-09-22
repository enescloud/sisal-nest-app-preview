/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserRole, UserType } from '@prisma/client';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'RoleCheck' })
/* The RoleCheckConstraint class is a TypeScript class that implements the ValidatorConstraintInterface
and is used to validate user roles based on their user type. */
export class RoleCheckConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const [userType]: UserType[] = args.constraints;
    const role: UserRole = (args.object as any)[args.property];
    switch (userType) {
      case UserType.admin:
        return role === UserRole.admin_superAdmin;
      case UserType.user:
        return role === UserRole.user_member;
      default:
        return false;
    }
  }

  defaultMessage(): string {
    return 'Invalid role(s)';
  }
}

/**
 * The RoleCheck function is a decorator that can be used to validate the role of a user in TypeScript.
 * @param {UserType} property - The `property` parameter is of type `UserType`. It represents the role
 * that needs to be checked for validation.
 * @param {ValidationOptions} [validationOptions] - The `validationOptions` parameter is an optional
 * parameter that allows you to pass additional options to the decorator. These options can be used to
 * customize the validation behavior.
 * @returns a void, meaning it does not return any value.
 */
export function RoleCheck(
  property: UserType,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        ...validationOptions,
      },
      constraints: [property],
      validator: RoleCheckConstraint,
    });
  };
}
