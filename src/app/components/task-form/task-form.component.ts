import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule , FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask } from 'src/app/store/task.actions';
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', Validators.required],
      persons: this.fb.array([])
    });
  }

  get persons() {
    return this.taskForm.get('persons') as FormArray;
  }

  personSkills(personIndex: number): FormArray {
    return this.persons.at(personIndex).get('skills') as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([])
    });
    this.persons.push(personForm);
  }

  removePerson(index: number) {
    this.persons.removeAt(index);
  }

  addSkill(personIndex: number) {
    this.personSkills(personIndex).push(this.fb.control('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number) {
    this.personSkills(personIndex).removeAt(skillIndex);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = {
        ...this.taskForm.value,
        id: Date.now(),
        completed: false
      };
      this.store.dispatch(addTask({ task: newTask }));
      this.taskForm.reset();
    }
  }
}
