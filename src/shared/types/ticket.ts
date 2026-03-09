export default interface Ticket {
    code: number;
    title: string;
    requestedUser: {
      name: string
    };
    priority: string;
    status: string;
    createdAt: string;
  }