// type/note.ts
export interface Task {
  id?: string;
  title: string;
  description?: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate?: string; // ISO string
  notificationId?: string | null;
  completed?: boolean;
  userId?: string;
}
