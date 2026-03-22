import { useState, useEffect, useCallback } from "react";
import { api } from "../../lib/api"; // ajuste o caminho conforme seu projeto
import "./style.css";

const roleMap: Record<string, string> = {
  ADMIN: "Administrador",
  SUPPORT: "Suporte",
  CLIENT: "Cliente",
};

const roleBadgeClass: Record<string, string> = {
  ADMIN: "um-badge-admin",
  SUPPORT: "um-badge-support",
  CLIENT: "um-badge-client",
};

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function UserManagementModal({ isOpen, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Busca todos os usuários ao abrir o modal
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<{ users: User[]; total: number }>("/users");
      setUsers(data.users);
    } catch (err) {
      setError("Erro ao carregar usuários. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen, fetchUsers]);

  // Atualiza role de um usuário específico
  const handleRoleChange = useCallback(async (id: string, newRole: string) => {
    setUpdatingId(id);
    // Atualização otimista: aplica na UI imediatamente
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
    try {
      await api.put(`/users/${id}`, { role: newRole });
    } catch (err) {
      // Rollback em caso de erro: rebusca o estado real do servidor
      setError("Erro ao atualizar função do usuário.");
      fetchUsers();
    } finally {
      setUpdatingId(null);
    }
  }, [fetchUsers]);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  if (!isOpen) return null;

  return (
    <div className="um-overlay" onClick={onClose}>
      <div className="um-modal" onClick={(e) => e.stopPropagation()}>

        <div className="um-header">
          <h2>Gerenciar Usuários</h2>
          <button className="um-close" onClick={onClose}>✕</button>
        </div>

        <div className="um-body">
          <input
            className="um-search"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {error && (
            <div className="um-error">
              {error}
              <button onClick={fetchUsers} className="um-retry-btn">
                Tentar novamente
              </button>
            </div>
          )}

          <div className="um-list">
            {loading ? (
              <div className="um-loading">Carregando usuários...</div>
            ) : filtered.length > 0 ? (
              filtered.map((user) => (
                <div
                  key={user.id}
                  className={`um-user-row ${updatingId === user.id ? "um-user-row--updating" : ""}`}
                >
                  <div className="um-user-avatar">{initials(user.name)}</div>
                  <div className="um-user-info">
                    <div className="um-user-name">{user.name}</div>
                    <div className="um-user-email">{user.email}</div>
                  </div>
                  <span className={`um-badge ${roleBadgeClass[user.role] ?? ""}`}>
                    {roleMap[user.role] ?? user.role}
                  </span>
                  <select
                    className="um-role-select"
                    value={user.role}
                    disabled={updatingId === user.id}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="ADMIN">Administrador</option>
                    <option value="SUPPORT">Suporte</option>
                    <option value="CLIENT">Cliente</option>
                  </select>
                </div>
              ))
            ) : (
              <div className="um-empty">Nenhum usuário encontrado</div>
            )}
          </div>
        </div>

        <div className="um-footer">
          <span className="um-count">
            {loading ? "—" : `${filtered.length} usuários`}
          </span>
          <button className="um-btn-close" onClick={onClose}>Fechar</button>
        </div>

      </div>
    </div>
  );
}