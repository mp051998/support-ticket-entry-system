
interface Comment {
  user: string;
  message: string;
  sentAt: Date;
}

export interface Ticket {
  id: number;
  topic: string;
  description: string;
  dateCreated: Date;
  severity: string;
  type: string;
  assignedTo: string;
  status: string;
  resolvedOn: Date | null;
  comments: Comment[];
}

