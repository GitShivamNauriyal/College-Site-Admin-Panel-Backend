import { errors } from '@vinejs/vine';

export class CustomErrorReporter {
  /**
   * A flag to know if one or more errors have been
   * reported
   */
  hasErrors = false;

  /**
   * A collection of errors. Feel free to give accurate types
   * to this property
   */
  errors = {};

  /**
   * VineJS call the report method
   */
  report(
    message,
    rule,
    field,
    meta
  ) {
    this.hasErrors = true;

    /**
     * Collecting errors as per the JSONAPI spec
     */

    // Correctly capturing the field path
    const fieldPath = field.wildCardPath || field.path;
    this.errors[fieldPath] = message;
  }

  /**
   * Creates and returns an instance of the
   * ValidationError class
   */
  createError() {
    return new errors.E_VALIDATION_ERROR(this.errors);
  }
}
