import type { InputHTMLAttributes } from "react";
import "./style.css";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function FormField({ error, ...inputProps }: FormFieldProps) {
  return (
    <div className="form-field">
      <input {...inputProps} />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
}
