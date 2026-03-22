import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { UserManagementModal } from "../UserManagementModal";
import { api } from "../../lib/api";
import Chart from "chart.js/auto";
import "./style.css";

interface DashboardData {
  chamadosAbertos: number;
  chamadosAndamento: number;
  chamadosResolvidos: number;
  chamadosPendentes: number;
}

const roleLabel: Record<string, string> = {
  ADMIN: "Administrador",
  SUPPORT: "Suporte",
  CLIENT: "Cliente",
};

export function ProfilePage() {
  const { user } = useContext(AuthContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    chamadosAbertos: 0,
    chamadosAndamento: 0,
    chamadosResolvidos: 0,
    chamadosPendentes: 0,
  });
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const initials = user?.email ? user.email[0].toUpperCase() : "?";

  const isAdmin = userDetails?.role === "ADMIN";

  useEffect(() => {
    api.get("/ticket/dashboard").then((res) => {
      const data = res.data;
      const pendentes = data.tickets.filter(
        (t: any) => t.status === "PENDING"
      ).length;

      setDashboardData({
        chamadosAbertos: data.chamadosAbertos,
        chamadosAndamento: data.chamadosAndamento,
        chamadosResolvidos: data.chamadosResolvidos,
        chamadosPendentes: pendentes,
      });
    });
  }, []);

  useEffect(() => {
    api.get("/auth/me").then((res) => {
      const sub = res.data.user?.sub;
      if (sub) {
        api.get(`/users/${sub}`).then((res2) => {
          setUserDetails(res2.data);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Abertos", "Pendentes", "Em Andamento", "Resolvidos"],
        datasets: [{
          data: [
            dashboardData.chamadosAbertos,
            dashboardData.chamadosPendentes,
            dashboardData.chamadosAndamento,
            dashboardData.chamadosResolvidos,
          ],
          backgroundColor: ["#2563eb", "#ef4444", "#f59e0b", "#22c55e"],
          borderWidth: 0,
        }],
      },
      options: {
        cutout: "70%",
        plugins: { legend: { display: false } },
        responsive: false,
      },
    });

    return () => { chartInstance.current?.destroy(); };
  }, [dashboardData]);

  return (
    <div style={{ background: "#f8fafc", padding: "28px 32px 32px" }}>
      <div className="profile-page-title">Meu Perfil</div>
      <div className="profile-page-sub">Gerencie suas informações</div>

      <div className="profile-grid">
        <div className="profile-left">
          <div className="profile-card">
            <div className="profile-avatar">{initials}</div>
            <div className="profile-name">{user?.email}</div>

            <span className="profile-badge">
              {userDetails?.role ? roleLabel[userDetails.role] ?? userDetails.role : "—"}
            </span>

            {isAdmin && (
              <>
                <div className="profile-divider" />
                <button
                  className="profile-btn-manage"
                  onClick={() => setIsModalOpen(true)}
                >
                  Gerenciar Usuários
                </button>
              </>
            )}
          </div>
        </div>

        <div className="profile-right">
          <div className="profile-card">
            <div className="profile-card-title">Informações Pessoais</div>
            <div className="profile-fields">
              <div className="profile-field">
                <label>Email</label>
                <div className="profile-field-value">{user?.email}</div>
              </div>
              <div className="profile-field">
                <label>Cargo</label>
                <div className="profile-field-value">
                  {userDetails?.role ? roleLabel[userDetails.role] ?? userDetails.role : "—"}
                </div>
              </div>
              <div className="profile-field">
                <label>Membro desde</label>
                <div className="profile-field-value">
                  {userDetails?.createdAt
                    ? new Date(userDetails.createdAt).toLocaleDateString("pt-BR")
                    : "—"}
                </div>
              </div>
            </div>

            <div className="profile-divider" />

            <div className="profile-card-title">Meus Chamados</div>
            <div className="profile-chart-section">
              <canvas ref={chartRef} width="180" height="180" />
              <div className="profile-legend">
                <div className="legend-item">
                  <div className="legend-dot blue" />
                  <span>Abertos — {dashboardData.chamadosAbertos}</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot red" />
                  <span>Pendentes — {dashboardData.chamadosPendentes}</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot amber" />
                  <span>Em Andamento — {dashboardData.chamadosAndamento}</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot green" />
                  <span>Resolvidos — {dashboardData.chamadosResolvidos}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserManagementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}