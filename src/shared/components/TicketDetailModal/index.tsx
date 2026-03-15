import { useContext, useState, useEffect } from "react";
import { api } from "../../lib/api";
import { ToastContext } from "../../contexts/ToastContext";
import type Ticket from "../../types/ticket";
import "./style.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket | null;
  onUpdate: () => void;
}

export function TicketDetailModal({ isOpen, onClose, ticket, onUpdate }: Props) {
  const toastContext = useContext(ToastContext);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setPriority(ticket.priority);
    }
  }, [ticket]);

  if (!isOpen || !ticket) return null;

  async function handleSave() {
    try {
      setLoading(true);
      await api.put(`/ticket/${(ticket as any).id}`, {
        title: ticket!.title,
        description: ticket!.description,
        status: status,
        priority: priority,
        requested_user_id: (ticket as any).requestedUserId,
      });
      toastContext?.showToast("Chamado atualizado com sucesso!", "success");
      onUpdate();
      onClose();
    } catch (err) {
      console.log("erro:", err);
      toastContext?.showToast("Erro ao atualizar chamado.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>

        <div className="detail-header">
          <h2>Detalhes do Chamado</h2>
          <button className="detail-close" onClick={onClose}>✕</button>
        </div>

        <div className="detail-body">
          <div className="detail-left">
            <div className="detail-row">
              <div className="detail-field">
                <label>ID</label>
                <p>#{ticket.code}</p>
              </div>
              <div className="detail-field">
                <label>Prioridade</label>
                <select
                  className="detail-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="LOW">Baixa</option>
                  <option value="MEDIUM">Média</option>
                  <option value="HIGH">Alta</option>
                </select>
              </div>
            </div>
            <div className="detail-field">
              <label>Solicitante</label>
              <p>{ticket.requestedUser.name}</p>
            </div>
            <div className="detail-field">
              <label>Título</label>
              <p>{ticket.title}</p>
            </div>
            <div className="detail-field">
              <label>Descrição</label>
              <div className="detail-desc">{ticket.description}</div>
            </div>
            <div className="detail-field">
              <label>Status</label>
              <select
                className="detail-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="OPEN">Aberto</option>
                <option value="IN_PROGRESS">Em Andamento</option>
                <option value="DONE">Resolvido</option>
              </select>
            </div>
          </div>

          <div className="detail-right">
            <div className="detail-comments-title">Comentários</div>
            <div className="detail-comments-empty">Em breve...</div>
          </div>
        </div>

        <div className="detail-footer">
          <button className="detail-btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="detail-btn-save" onClick={handleSave} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>

      </div>
    </div>
  );
}