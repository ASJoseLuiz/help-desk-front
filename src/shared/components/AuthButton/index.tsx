import type { ButtonHTMLAttributes } from "react";
import "./style.css";

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function AuthButton({ children, ...props }: AuthButtonProps) {
  return (
    <button className="auth-button" {...props}>
      {children}
    </button>
  );
}
