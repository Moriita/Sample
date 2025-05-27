export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'A' | 'B' | 'C' | 'D';
  createdAt: Date;
  updatedAt?: Date;
} 