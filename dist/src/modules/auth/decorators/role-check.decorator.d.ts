import { UserType } from '@prisma/client';
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class RoleCheckConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(): string;
}
export declare function RoleCheck(property: UserType, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
//# sourceMappingURL=role-check.decorator.d.ts.map