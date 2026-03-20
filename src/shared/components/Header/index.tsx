import { useState, useContext } from "react";
import "./style.css";
import { NavLink, useNavigate } from "react-router-dom";
import { NewTicketModal } from "../NewTicketModal";
import { AuthContext } from "../../contexts/AuthContext";

interface HeaderProps {
  onTicketCreated?: () => void;
}

export function Header({ onTicketCreated }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const { logout } = useContext(AuthContext)!;
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo">💬</div>
          <span className="title">HelpDesk</span>
        </div>

        <nav className="header-nav">
          <NavLink to="/home">Dashboard</NavLink>
          <NavLink to="/calls">Chamados</NavLink>
          <NavLink to="/profile">Perfil</NavLink>
        </nav>

        <div className="header-right">
          <button className="btn-logout" onClick={() => setIsLogoutOpen(true)}>
            Sair
          </button>
          <button className="new-ticket" onClick={() => setIsModalOpen(true)}>
            + Novo Chamado
          </button>
        </div>
      </header>

      <NewTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={onTicketCreated}
      />

      {isLogoutOpen && (
        <div className="logout-overlay" onClick={() => setIsLogoutOpen(false)}>
          <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Sair da conta</h2>
            <p>Tem certeza que deseja sair?</p>
            <div className="logout-actions">
              <button className="btn-cancel-logout" onClick={() => setIsLogoutOpen(false)}>
                Cancelar
              </button>
              <button className="btn-confirm-logout" onClick={handleLogout}>
                Sim, sair
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}