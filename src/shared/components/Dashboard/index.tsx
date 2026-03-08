import "./style.css";
import{
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

        <div className="dashboard-card">
          <span>Total de Chamados</span>
          <Mail className= "icon total-icon" />
          <h2>{chamadosAbertos ?? 0}</h2>
        </div>

        <div className="dashboard-card">
          <span>Em Andamento</span>
          <AlertCircle className="icon andamento-icon" />
          <h2>{chamadosAndamento ?? 0}</h2>
        </div>

        <div className="dashboard-card">
          <span>Pendentes</span>
          <TriangleAlert className="icon pendente-icon" />
          <h2>{chamadosPendentes ?? 0}</h2>
        </div>

        <div className="dashboard-card">
          <span>Resolvidos</span>
          <CheckCircle className="icon resolvido-icon" />
          <h2>{chamadosResolvidos ?? 0}</h2>
        </div>

      </div>

    </div>
  );
}