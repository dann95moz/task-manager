import { createAction, props } from '@ngrx/store';
import { Task } from '../interfaces/task.interface';
import { Person } from '../interfaces/person.interface';

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());
export const completeTask = createAction('[Task] Complete Task', props<{ id: number }>());
export const markTaskAsPending = createAction('[Task] Mark Task as Pending', props<{ id: number }>());
export const addPersonToTask = createAction('[Task] Add Person to Task', props<{ taskId: number, person: Person }>());
export const removePersonFromTask = createAction('[Task] Remove Person from Task', props<{ taskId: number, personId: number }>());
export const addSkillToPerson = createAction('[Task] Add Skill to Person', props<{ taskId: number, personId: number, skill: string }>());
export const removeSkillFromPerson = createAction('[Task] Remove Skill from Person', props<{ taskId: number, personId: number, skill: string }>());
