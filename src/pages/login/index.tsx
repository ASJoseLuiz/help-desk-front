import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./style.css";
import { useCallback } from "react";
import { useAuth } from "../../shared/hooks/useAuth";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { login } = useAuth();

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      await login(data.email, data.password);
    },
    [login],
  );

  return (
    <div className="login-layout">
      <div className="login-left">
        <div className="overlay">
          <h1>Help Desk</h1>
          <p>Sistema de gerenciamento de chamados</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Digite seu email"
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/,
                    message: "Email inválido",
                  },
                })}
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Digite sua senha"
                {...register("password", { required: "Senha é obrigatória" })}
              />
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
            </div>

            <button type="submit" className="login-button">
              Entrar
            </button>
          </form>

          <p className="register-text">
            Não tem conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
