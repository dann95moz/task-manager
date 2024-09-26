import { Person } from './person.interface';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: Date;
  persons: Person[];
}
