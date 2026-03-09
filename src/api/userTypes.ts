export interface IFormValue {
  [key: string]: string;
}

export interface IFields {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  validation?: ValidationRule[];
}

export interface ValidationRule {
  type:
    | "required"
    | "email"
    | "phone"
    | "password"
    | "minLength"
    | "maxLength"
    | "match"
    | "custom";
  value?: any;
  message?: string;
  matchField?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}
