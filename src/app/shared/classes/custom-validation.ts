import { AbstractControl } from '@angular/forms';

export class CustomValidation {
  static MatchPassword(_abstractControl: AbstractControl) {
    let password = _abstractControl.get('password').value; // to get value in input tag
    let confirmPassword = _abstractControl.get('confirmPassword').value; // to get value in input tag
    if (password != confirmPassword) {
      _abstractControl
        .get('confirmPassword')
        .setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
}
