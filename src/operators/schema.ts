import { Schema, SchemaValidator } from "../SchemaValidator";

export function schema<T, R>(validators: Schema<T, R>): SchemaValidator<T, R> {
  return new SchemaValidator(validators);
}
