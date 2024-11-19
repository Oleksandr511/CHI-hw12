import { HttpError } from "routing-controllers";

function ValidateArgs(test: string) {
  console.log(`Decorator called with test: ${test}`); // Called once on creation

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (args[0].name.length < 2) {
        throw new HttpError(
          400,
          "User name must be at least 2 characters long"
        );
      }
      if (args[0].email.length < 2 || !args[0].email.includes("@")) {
        throw new HttpError(
          400,
          "User email must be at least 2 characters long and contain @"
        );
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
export { ValidateArgs };
