import type { ReactNode } from "react";
import "./style.css";

type AuthCardProps = {
  title: string;
  children: ReactNode;
};

export function AuthCard({ title, children }: AuthCardProps) {
  return (
    <div className="auth-card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
