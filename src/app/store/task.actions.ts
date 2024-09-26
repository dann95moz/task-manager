import { createAction, props } from '@ngrx/store';
import { Task } from '../interfaces/task.interface';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const completeTask = createAction('[Task] Complete Task', props<{ id: number }>());
export const markTaskAsPending = createAction('[Task] Mark Task as Pending', props<{ id: number }>());
