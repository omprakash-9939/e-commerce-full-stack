
export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

export type AuthState = "Login" | "Sign Up";


