import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./style.css";

type RegisterFormData = {
  login: string;
  email: string;
  password: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log("Dados do cadastro:", data);
  };

  return (
    <div className="register-layout">
      <div className="register-left">
        <div className="overlay">
          <h1>Help Desk</h1>
          <p>Crie sua conta para acessar o sistema</p>
        </div>
      </div>

      <div className="register-right">
        <div className="register-card">
          <h2>Cadastro</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Digite seu login"
                {...register("login", {
                  required: "Login é obrigatório",
                  maxLength: {
                    value: 30,
                    message: "O login pode ter no máximo 30 caracteres"
                  }
                })}
              />
              {errors.login && (
                <span className="error">{errors.login.message}</span>
              )}
            </div>

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
                {...register("password", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "Senha deve ter no mínimo 6 caracteres",
                  },
                })}
              />
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
            </div>

            <button type="submit" className="register-button">
              Cadastrar
            </button>
          </form>

          <p className="login-text">
            Já tem conta? <Link to="/login">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;