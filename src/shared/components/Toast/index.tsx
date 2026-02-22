import { useEffect } from "react";
import "./style.css";

const ToastType = {
  INFO: "info",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
} as const;

export type ToastType = (typeof ToastType)[keyof typeof ToastType];

type ToastProps = {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
};

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer); // ← arrow function aqui
  }, [duration, onClose]);

  return (
    <div className={`toast toast--${type}`}>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}
