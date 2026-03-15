export default interface Ticket {
    id: string;
    code: number;
    title: string;
    description: string;
    requestedUserId: string;
    requestedUser: {
      name: string
    };
    priority: string;
    status: string;
    createdAt: string;
  }