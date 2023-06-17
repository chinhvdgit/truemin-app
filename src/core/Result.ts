export default class Result<T> {
  public value: T;
  public errors: string[];
  public succeeded?: boolean;
  public failed?: boolean;
  public message?: string;
  public get hasErrors(): boolean {
      return (this.errors != null && Array.isArray(this.errors) && this.errors.length > 0);
  }

  constructor(succeeded: boolean, failed: boolean, message: string, value: T, ...errors: string[]) {
      this.succeeded = succeeded;
      this.failed = failed;
      this.message = message;
      this.value = value;
      this.errors = errors[0] == undefined || errors[0] == null ? [] : errors;
  }

}