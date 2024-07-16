export type InputType =
  | "email"
  | "confirmEmail"
  | "password"
  | "confirmPassword"
  | "name"
  | "age";

export interface IForm {
  isLogin: boolean;
  onSubmit: (value: ISubmit) => void;
  credentialsInvalid: IValid;
}

export interface IValid {
  email: boolean;
  confirmEmail: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export interface ISubmit {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}
