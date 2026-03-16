import { useEffect, useState } from "react";
import { Header } from "../../shared/components/Header";
import { Navbar } from "../../shared/components/Navbar";
import { api } from "../../shared/lib/api";
import type Ticket from "../../shared/types/ticket";
import { TicketsTable } from "../../shared/components/TicketsTable";

export default function Calls() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  async function loadTickets() {
    try {
      const response = await api.get("/ticket");
      setTickets(response.data);
    } catch {
      console.log("Erro ao buscar chamados");
    }
  }

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <div>
      <div style={{ marginLeft: "220px" }}>
        <Header onTicketCreated={loadTickets} />
        <Navbar />

        <div style={{ background: "#f8fafc", padding: "28px 32px 32px" }}>
          <TicketsTable
            tickets={tickets}
            onUpdate={loadTickets}
          />
        </div>
      </div>
    </div>
  );
}