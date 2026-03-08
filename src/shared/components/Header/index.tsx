import "./style.css";

export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">💬</div>
        <span className="title">HelpDesk</span>
      </div>

      <nav className="header-nav">
        <a href="#">Dashboard</a>
        <a href="#">Chamados</a>
        <a href="#">Usuários</a>
      </nav>

      <div className="header-right">
        <button className="new-ticket">
          + Novo Chamado
        </button>
      </div>
    </header>
  );
}