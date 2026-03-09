import { useEffect, useState } from "react";

import { Navbar } from "../../shared/components/Navbar";
import { Dashboard } from "../../shared/components/Dashboard";
import { DashboardHeader } from "../../shared/components/DashboardHeader/index";
import { api } from "../../shared/lib/api";
import { Header } from "../../shared/components/Header";
import { RecentTickets } from "../../shared/components/RecentTickets";
import type Ticket from "../../shared/types/ticket";

interface DashboardData {
  chamadosAbertos: number;
  chamadosAndamento: number;
  chamadosResolvidos: number;
  usuarios: number;
  tickets: Ticket[];
}

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await api.get("/ticket/dashboard");

        setData(response.data);

      } catch (error) {
        console.log("Erro ao buscar dados do dashboard");
      }
    }

    loadDashboard();
  }, []);

  return (
    <div>

      <div style={{ marginLeft: "220px" }}>
        <Header />
        <Navbar />
        <DashboardHeader />

        <Dashboard
          chamadosAbertos={data?.chamadosAbertos}
          chamadosResolvidos={data?.chamadosResolvidos}
          usuarios={data?.usuarios}
        />
        <RecentTickets chamados={data?.tickets} />

      </div>

    </div>
  );
}