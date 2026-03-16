import { timeAgo } from "../../lib/timeAgo";
import type Ticket from "../../types/ticket";
import "./style.css";

const priorityMap: Record<string, string> = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
};

const statusMap: Record<string, string> = {
  OPEN: "Aberto",
  IN_PROGRESS: "Em andamento",
  PENDING: "Pendente",
  DONE: "Resolvido",
};

interface Props {
  chamados?: Ticket[];
}

export function RecentTickets({ chamados }: Props) {
  const chamadosRecentes = chamados?.filter((ticket) => {
    const createdAt = new Date(ticket.createdAt);
    const agora = new Date();
    const diferencaHoras = (agora.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    return diferencaHoras <= 24;
  });

  return (
    <div className="recent-tickets">

      <div className="recent-tickets-header">
        <h2>Chamados Recentes</h2>
        <span className="recent-tickets-badge">
          {chamadosRecentes?.length ?? 0} chamados
        </span>
      </div>

      <table className="tickets-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Solicitante</th>
            <th>Prioridade</th>
            <th>Status</th>
            <th>Tempo</th>
          </tr>
        </thead>

        <tbody>
          {chamadosRecentes && chamadosRecentes.length > 0 ? (
            chamadosRecentes.map((ticket) => (
              <tr key={ticket.code}>
                <td>#{ticket.code}</td>
                <td>{ticket.title}</td>
                <td>{ticket.requestedUser.name}</td>
                <td>
                  <span className={`priority ${priorityMap[ticket.priority]}`}>
                    {priorityMap[ticket.priority]}
                  </span>
                </td>
                <td>
                  <span className={`status ${ticket.status}`}>
                    {statusMap[ticket.status]}
                  </span>
                </td>
                <td>{timeAgo(ticket.createdAt)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", color: "#cbd5e1", padding: "32px" }}>
                Nenhum chamado recente
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}