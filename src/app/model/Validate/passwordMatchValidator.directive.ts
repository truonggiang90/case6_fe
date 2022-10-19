import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";


export const passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  let password = formGroup.get('password')?.value
  let confirmPassword = formGroup.get('confirmPassword')?.value
  //test dữ liễu
  console.log(password)
  // console.log(password)
  // console.log(confirmPassword)
  if (password !== confirmPassword) {
    return {passwordMismatch: true};
  } else return null;

};

