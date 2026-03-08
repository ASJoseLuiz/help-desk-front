import "./style.css";

interface Ticket {
  id: number;
  titulo: string;
  solicitante: string;
  prioridade: string;
  status: string;
  tempo: string;
}

interface Props {
  chamados?: Ticket[];
}

export function RecentTickets({ chamados }: Props) {
  return (
    <div className="recent-tickets">

      <h2>Chamados Recentes</h2>

      <table className="tickets-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Solicitante</th>
            <th>Prioridade</th>
            <th>Status</th>
            <th>Tempo</th>
          </tr>
        </thead>

        <tbody>

          {chamados?.map((ticket) => (
            <tr key={ticket.id}>

              <td>#{ticket.id}</td>

              <td>{ticket.titulo}</td>

              <td>{ticket.solicitante}</td>

              <td>
                <span className={`priority ${ticket.prioridade}`}>
                  {ticket.prioridade}
                </span>
              </td>

              <td>
                <span className={`status ${ticket.status}`}>
                  {ticket.status}
                </span>
              </td>

              <td>{ticket.tempo}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}