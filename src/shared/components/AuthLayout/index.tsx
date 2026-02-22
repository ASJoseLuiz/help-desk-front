import type { ReactNode } from "react";
import "./style.css";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div className="auth-overlay">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="auth-right">{children}</div>
    </div>
  );
}
