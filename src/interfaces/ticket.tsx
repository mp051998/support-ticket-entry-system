
interface Comment {
  user: string;
  message: string;
  sentAt: Date;
}

export interface Ticket {
  id: number;
  topic: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  severity: string;
  type: string;
  assignedTo: {
    id: number;
    name: string;
  }
  autoAssignedTo: {
    id: number;
    name: string;
  }
  autoAssignedAt: number,
  status: string;
  comments: Comment[];
}

