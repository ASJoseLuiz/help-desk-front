import "./style.css";

export function DashboardHeader() {
  return (
    <div className="dashboard-header">
        
      <div>
        <h1>Painel de Controle</h1>
        <p>Gerencie seus chamados de suporte</p>
      </div>

      <input
        className="search-input"
        placeholder="Buscar chamados..."
      />

    </div>
  );
}