import {Directive} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {passwordMatchValidator} from "./passwordMatchValidator.directive";
import {changePasswordMatchValidator} from "./changePasswordMatchValidator.directive";



@Directive({
  selector: '[appPasswordMatchValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ChangePasswordMatchValidatorRevealedDirective, multi: true }]
})

export class ChangePasswordMatchValidatorRevealedDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return  changePasswordMatchValidator(control);
  }
}
