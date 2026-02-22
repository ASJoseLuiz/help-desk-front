import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { useAuth } from "../../shared/hooks/useAuth";
import {
  AuthButton,
  AuthCard,
  AuthLayout,
  FormField,
} from "../../shared/components";

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
  const [isLoading, setIsloading] = useState<boolean>(false);

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      setIsloading(true);
      await login(data.email, data.password).finally(() => {
        setIsloading(false);
      });
    },
    [login],
  );

  return (
    <AuthLayout
      title="Help Desk"
      subtitle="Sistema de gerenciamento de chamados"
    >
      <AuthCard title="Login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            type="email"
            placeholder="Digite seu email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/,
                message: "Email inválido",
              },
            })}
          />

          <FormField
            type="password"
            placeholder="Digite sua senha"
            error={errors.password?.message}
            {...register("password", { required: "Senha é obrigatória" })}
          />

          <AuthButton type="submit" isLoading={isLoading}>
            Entrar
          </AuthButton>
        </form>

        <p style={{ marginTop: 15, textAlign: "center" }}>
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}
