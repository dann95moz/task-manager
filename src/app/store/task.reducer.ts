import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';
import { Task } from '../interfaces/task.interface';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: []
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  on(TaskActions.completeTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.map(task =>
      task.id === id ? { ...task, completed: true } : task
    )
  })),
  //TODO: Implementar los demás reducers para las acciones definidas
);