import { ValidationError } from "yup";
import { IFormErrors } from "../interfaces/IFormErrors";

export default function getValidationError(err: ValidationError): IFormErrors {
  const validationError: IFormErrors = {};

  err.inner.forEach(error => {
    validationError[error.path ? error.path : "key"] = error.message;
  });

  return validationError;
}
