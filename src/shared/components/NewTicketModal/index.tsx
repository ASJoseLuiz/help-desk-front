import { useContext, useState } from "react";
import { ToastContext } from "../../contexts/ToastContext";
import { api } from "../../lib/api";
import "./style.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function NewTicketModal({ isOpen, onClose, onSuccess }: Props) {
  const toastContext = useContext(ToastContext);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [errors, setErrors] = useState({ titulo: "", descricao: "" });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors = {
      titulo: titulo.trim() === "" ? "O título é obrigatório." : "",
      descricao: descricao.trim() === "" ? "A descrição é obrigatória." : "",
    };

    setErrors(newErrors);

    if (newErrors.titulo || newErrors.descricao) {
      toastContext?.showToast("Não foi possível abrir o chamado.", "error");
      return;
    }

    try {
      setLoading(true);

      await api.post("/ticket", {
        title: titulo,
        description: descricao,
      });

      toastContext?.showToast("Chamado aberto com sucesso!", "success");
      setTitulo("");
      setDescricao("");
      setErrors({ titulo: "", descricao: "" });
      onSuccess?.();
      onClose();

    } catch {
      toastContext?.showToast("Erro ao abrir chamado.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2>Novo Chamado</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>

          <div className="modal-field">
            <label>Título</label>
            <input
              type="text"
              placeholder="Digite o título do chamado..."
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className={errors.titulo ? "input-error" : ""}
            />
            {errors.titulo && <span className="error-message">{errors.titulo}</span>}
          </div>

          <div className="modal-field">
            <label>Descrição</label>
            <textarea
              placeholder="Descreva o problema em detalhes..."
              rows={5}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className={errors.descricao ? "input-error" : ""}
            />
            {errors.descricao && <span className="error-message">{errors.descricao}</span>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Abrindo..." : "Abrir Chamado"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}