import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidation } from '../../shared/classes/custom-validation';

@Component({
  selector: 'appi-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public pType: string = 'password';
  public signUpForm: FormGroup;
  public roles: string[] = ['Admin', 'User'];
  public isSubmitted: boolean = false;
  constructor(private _fb: FormBuilder) {}

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
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        address: [
          '',
          Validators.compose([Validators.required, Validators.maxLength(29)])
        ]
      },
      {
        validator: CustomValidation.MatchPassword
      }
    );
  }

  registerUser() {
    console.log(this.signUpForm);
    console.log('btn clicked');
    if (this.signUpForm.invalid) {
      this.isSubmitted = true;
    }
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
