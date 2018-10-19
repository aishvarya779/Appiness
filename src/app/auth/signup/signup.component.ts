import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidation } from '../../shared/classes/custom-validation';
import { Router } from '@angular/router';
import { PasswordStrength } from './../../shared/classes/password-strength';
import { AuthService } from '../auth.service';
import { MessageService } from '../../shared/services/message.service';
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
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authSerivce: AuthService,
    private _msgService: MessageService
  ) {}

  ngOnInit() {
    this.signUpForm = this._fb.group(
      {
        userName: ['', Validators.required],
        name: ['', Validators.required],
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
            Validators.maxLength(10),
            Validators.pattern('^[0-9]*$')
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
    if (this.signUpForm.invalid) {
      return;
    }
    this._authSerivce.register(this.signUpForm.value).subscribe(
      res => {
        this._msgService.showSuccess('User Registered successfully');
        this._router.navigate(['auth']);
      },
      err => {
        this._msgService.showError(err.error.message);
      }
    );
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
