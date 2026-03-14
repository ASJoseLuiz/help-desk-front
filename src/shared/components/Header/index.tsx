import { useState } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { NewTicketModal } from "../NewTicketModal";

interface HeaderProps {
  onTicketCreated?: () => void;
}

export function Header({ onTicketCreated }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo">💬</div>
          <span className="title">HelpDesk</span>
        </div>

        <nav className="header-nav">
          <NavLink to="/home">Dashboard</NavLink>
          <NavLink to="/chamados">Chamados</NavLink>
          <NavLink to="/perfil">Perfil</NavLink>
        </nav>

        <div className="header-right">
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
    </>
  );
}