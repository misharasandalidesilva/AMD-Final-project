interface Task {
  id?: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'work' | 'personal' | 'health';
  date: string;
  completed?: boolean;
}
export default Task;