import "./style.css";
import {
  Mail,
  AlertCircle,
  TriangleAlert,
  CheckCircle,
} from "lucide-react";

interface Props {
  chamadosAbertos?: number;
  chamadosResolvidos?: number;
  chamadosAndamento?: number;
  chamadosPendentes?: number;
  usuarios?: number;
}

export function Dashboard({
  chamadosAbertos,
  chamadosAndamento,
  chamadosPendentes,
  chamadosResolvidos,
}: Props) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-cards">

        <div className="dashboard-card card-accent-blue">
          <div className="dashboard-card-top">
            <span>Total de Chamados</span>
            <div className="dashboard-card-icon total-icon">
              <Mail className="icon" />
            </div>
          </div>
          <h2>{chamadosAbertos ?? 0}</h2>
        </div>

        <div className="dashboard-card card-accent-amber">
          <div className="dashboard-card-top">
            <span>Em Andamento</span>
            <div className="dashboard-card-icon andamento-icon">
              <AlertCircle className="icon" />
            </div>
          </div>
          <h2>{chamadosAndamento ?? 0}</h2>
        </div>

        <div className="dashboard-card card-accent-red">
          <div className="dashboard-card-top">
            <span>Pendentes</span>
            <div className="dashboard-card-icon pendente-icon">
              <TriangleAlert className="icon" />
            </div>
          </div>
          <h2>{chamadosPendentes ?? 0}</h2>
        </div>

        <div className="dashboard-card card-accent-green">
          <div className="dashboard-card-top">
            <span>Resolvidos</span>
            <div className="dashboard-card-icon resolvido-icon">
              <CheckCircle className="icon" />
            </div>
          </div>
          <h2>{chamadosResolvidos ?? 0}</h2>
        </div>

      </div>
    </div>
  );
}