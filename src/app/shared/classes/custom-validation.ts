import { AbstractControl } from '@angular/forms';

export class CustomValidation {
  static MatchPassword(_abstractControl: AbstractControl) {
    const password = _abstractControl.get('password').value; // to get value in input tag
    const confirmPassword = _abstractControl.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      _abstractControl
        .get('confirmPassword')
        .setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
}
