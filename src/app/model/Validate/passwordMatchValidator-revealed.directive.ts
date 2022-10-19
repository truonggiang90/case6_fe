import {Directive} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {passwordMatchValidator} from "./passwordMatchValidator.directive";



@Directive({
  selector: '[appPasswordMatchValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatchValidatorRevealedDirective, multi: true }]
})

export class PasswordMatchValidatorRevealedDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return passwordMatchValidator(control);
  }
}
