import { useState } from "react";
import "./style.css";

const mockUsers = [
  { id: "157", name: "Duquesa", email: "duquesa@empresa.com", role: "ADMIN" },
  { id: "777", name: "Marina Sena", email: "marinasena@empresa.com", role: "SUPPORT" },
  { id: "666", name: "Pedro sampaio", email: "pedrosampaio@empresa.com", role: "CLIENT" },
  { id: "999", name: "Joaozin", email: "joaozin@empresa.com", role: "CLIENT" },
];

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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function UserManagementModal({ isOpen, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(mockUsers);

  if (!isOpen) return null;

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleRoleChange(id: string, newRole: string) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  }

  const initials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

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

          <div className="um-list">
            {filtered.length > 0 ? (
              filtered.map((user) => (
                <div key={user.id} className="um-user-row">
                  <div className="um-user-avatar">{initials(user.name)}</div>
                  <div className="um-user-info">
                    <div className="um-user-name">{user.name}</div>
                    <div className="um-user-email">{user.email}</div>
                  </div>
                  <span className={`um-badge ${roleBadgeClass[user.role]}`}>
                    {roleMap[user.role]}
                  </span>
                  <select
                    className="um-role-select"
                    value={user.role}
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
          <span className="um-count">{filtered.length} usuários</span>
          <button className="um-btn-close" onClick={onClose}>Fechar</button>
        </div>

      </div>
    </div>
  );
}