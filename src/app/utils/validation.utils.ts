// src/app/shared/utils/validation.utils.ts

import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';

export class ValidationUtils {
  static minArrayLength(min: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (control instanceof FormArray) {
        return control.length >= min ? null : { 'minLength': {actual: control.length, min: min} };
      }
      return null;
    };
  }

  static uniqueNameValidator(persons: FormArray): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const name = control.value;
      const isDuplicate = persons.controls.some((personControl, index) => 
        personControl.get('fullName')?.value === name && persons.controls.indexOf(control.parent as AbstractControl) !== index
      );
      return isDuplicate ? { 'duplicateName': true } : null;
    };
  }

}