import type { ButtonHTMLAttributes } from "react";
import "./style.css";

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export function AuthButton({
  isLoading,
  children,
  disabled,
  ...props
}: AuthButtonProps) {
  return (
    <button className="auth-button" disabled={isLoading || disabled} {...props}>
      {isLoading ? <span className="auth-button__spinner" /> : children}
    </button>
  );
}
