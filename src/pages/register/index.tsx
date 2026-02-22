import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import { api } from "../../shared/lib/api";
import {
  AuthButton,
  AuthCard,
  AuthLayout,
  FormField,
} from "../../shared/components";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = useCallback(async (data: RegisterFormData) => {
    await api.post("/users", data).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <AuthLayout
      title="Help Desk"
      subtitle="Crie sua conta para acessar o sistema"
    >
      <AuthCard title="Cadastro">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            type="text"
            placeholder="Digite seu nome"
            error={errors.name?.message}
            {...register("name", {
              required: "Nome é obrigatório",
              maxLength: {
                value: 30,
                message: "O nome pode ter no máximo 30 caracteres",
              },
            })}
          />

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
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "Senha deve ter no mínimo 6 caracteres",
              },
            })}
          />

          <AuthButton type="submit">Cadastrar</AuthButton>
        </form>

        <p style={{ marginTop: 15, textAlign: "center" }}>
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
}

export default Register;
