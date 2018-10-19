import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidation } from '../../shared/classes/custom-validation';
import { Router } from '@angular/router';
import { PasswordStrength } from './../../shared/classes/password-strength';
@Component({
  selector: 'appi-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public pType = 'password';
  public signUpForm: FormGroup;
  public roles: string[] = ['Admin', 'User'];
  public isSubmitted = false;
  constructor(private _fb: FormBuilder, private _router: Router) {}

  ngOnInit() {
    this.signUpForm = this._fb.group(
      {
        userName: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email])
        ],
        role: ['', Validators.required],
        mobile: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10)
          ])
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            PasswordStrength.strength,
            Validators.minLength(8)
          ])
        ],
        confirmPassword: ['', Validators.required],
        address: [
          '',
          Validators.compose([Validators.required, Validators.maxLength(30)])
        ]
      },
      {
        validator: CustomValidation.MatchPassword
      }
    );
  }

  registerUser() {
    console.log(this.signUpForm);
    if (this.signUpForm.invalid) {
      return;
    }
    this._router.navigate(['auth']);
  }

  togglePType(evt) {
    evt.stopPropagation();
    if (this.pType === 'password') {
      this.pType = 'text';
    } else {
      this.pType = 'password';
    }
  }
}
