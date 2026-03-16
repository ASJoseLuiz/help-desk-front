import { useState, useContext } from "react";
import { api } from "../../lib/api";
import { ToastContext } from "../../contexts/ToastContext";
import type Ticket from "../../types/ticket";
import { timeAgo } from "../../lib/timeAgo";
import { TicketDetailModal } from "../TicketDetailModal";
import "./style.css";

const priorityMap: Record<string, string> = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
};

const statusMap: Record<string, string> = {
  OPEN: "Aberto",
  PENDING: "Pendente",
  IN_PROGRESS: "Em Andamento",
  DONE: "Resolvido",
};

interface Props {
  tickets: Ticket[];
  onUpdate: () => void;
}

export function TicketsTable({ tickets, onUpdate }: Props) {
  const toastContext = useContext(ToastContext);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const filtered = tickets.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.requestedUser.name.toLowerCase().includes(search.toLowerCase()) ||
      String(t.code).includes(search);
    const matchStatus = filterStatus ? t.status === filterStatus : true;
    const matchPriority = filterPriority ? t.priority === filterPriority : true;
    return matchSearch && matchStatus && matchPriority;
  });

  async function handleClose(id: string) {
    const ticket = tickets.find(t => t.id === id)!;

    if (ticket.status === "DONE") {
      toastContext?.showToast("Este chamado já foi encerrado.", "warning");
      return;
    }

    try {
      await api.put(`/ticket/${id}`, {
        title: ticket.title,
        description: ticket.description,
        status: "DONE",
        priority: ticket.priority,
        requested_user_id: (ticket as any).requestedUserId,
      });
      onUpdate();
    } catch {
      console.log("Erro ao fechar chamado");
    }
  }

  return (
    <div>
      <div className="tickets-page-header">
        <div>
          <h1 className="tickets-page-title">Chamados</h1>
          <p className="tickets-page-sub">Gerencie e acompanhe todos os chamados</p>
        </div>
        <div className="tickets-filters">
          <input
            className="tickets-search"
            placeholder="Buscar chamados..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="tickets-filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="OPEN">Aberto</option>
            <option value="PENDING">Pendente</option>
            <option value="IN_PROGRESS">Em Andamento</option>
            <option value="DONE">Resolvido</option>
          </select>
          <select
            className="tickets-filter-select"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">Todas as prioridades</option>
            <option value="HIGH">Alta</option>
            <option value="MEDIUM">Média</option>
            <option value="LOW">Baixa</option>
          </select>
        </div>
      </div>

      <div className="tickets-table-section">
        <div className="tickets-table-header">
          <span className="tickets-table-title">Todos os Chamados</span>
          <span className="tickets-table-badge">{filtered.length} chamados</span>
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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((ticket) => (
                <tr key={ticket.code}>
                  <td>#{ticket.code}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.requestedUser.name}</td>
                  <td>
                    <span className={`ticket-priority ${ticket.priority}`}>
                      {priorityMap[ticket.priority]}
                    </span>
                  </td>
                  <td>
                    <span className={`ticket-status ${ticket.status}`}>
                      {statusMap[ticket.status]}
                    </span>
                  </td>
                  <td>{timeAgo(ticket.createdAt)}</td>
                  <td>
                    <div className="ticket-actions">
                      <button
                        className="btn-details"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        Detalhes
                      </button>
                      <button
                        className="btn-close"
                        onClick={() => handleClose(ticket.id)}
                      >
                        Encerrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", color: "#cbd5e1", padding: "32px" }}>
                  Nenhum chamado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TicketDetailModal
        isOpen={selectedTicket !== null}
        onClose={() => setSelectedTicket(null)}
        ticket={selectedTicket}
        onUpdate={onUpdate}
      />
    </div>
  );
}