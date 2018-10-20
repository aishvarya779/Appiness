import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidation } from '../../shared/classes/custom-validation';
import { Router } from '@angular/router';
import { PasswordStrength } from './../../shared/classes/password-strength';
import { AuthService } from '../auth.service';
import { MessageService } from '../../shared/services/message.service';
@Component({
  selector: 'appi-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  public isLoading = false;
  public pType = 'password';
  public firstFormGroup: FormGroup;
  public secondFromGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  public roles: string[] = ['Admin', 'User'];
  public isSubmitted = false;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authSerivce: AuthService,
    private _msgService: MessageService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._fb.group({
      userName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
    this.secondFromGroup = this._fb.group({
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
      address: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(30)])
      ]
    });
    this.thirdFormGroup = this._fb.group(
      {
        password: [
          '',
          Validators.compose([
            Validators.required,
            PasswordStrength.strength,
            Validators.minLength(8)
          ])
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: CustomValidation.MatchPassword
      }
    );
  }

  registerUser() {
    if (
      this.firstFormGroup.invalid ||
      this.secondFromGroup.invalid ||
      this.thirdFormGroup.invalid
    ) {
      return;
    }
    const data = {
      ...this.firstFormGroup.value,
      ...this.secondFromGroup.value,
      ...this.thirdFormGroup.value
    };
    this.isLoading = true;
    this._authSerivce.register(data).subscribe(
      res => {
        this.isLoading = false;
        this._msgService.showSuccess('User Registered successfully');
        this._router.navigate(['auth']);
      },
      err => {
        this.isLoading = false;
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
