import { FormControl } from '@angular/forms';

export class PasswordStrength {
  public static strength(control: FormControl) {
    const hasNumber = /\d/.test(control.value);
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);
    const errors = [];
    if (!hasNumber) {
      errors.push('Password must contain one digit');
    }
    if (!hasUpper) {
      errors.push('Password must contain one Uppercase letter');
    }
    if (!hasLower) {
      errors.push('Password must contain one Lowercase letter');
    }
    // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
    const valid = hasNumber && hasUpper && hasLower;
    if (errors.length > 0) {
      // return what´s not valid
      return { strong: errors };
    }
    return null;
  }
}
