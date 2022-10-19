import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


export const changePasswordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  let password = formGroup.get('newPassword')?.value
  let confirmPassword = formGroup.get('confirmNewPassword')?.value
  if (password !== confirmPassword) {
    return {changePasswordMismatch: true};
  }
  else return null;

};

