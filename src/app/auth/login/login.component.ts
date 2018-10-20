import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'appi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLoading = false;
  public userForm: FormGroup;
  public pType = 'password';
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _msgService: MessageService
  ) {}

  ngOnInit() {
    this.userForm = this._fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePType(evt) {
    evt.stopPropagation();
    if (this.pType === 'password') {
      this.pType = 'text';
    } else {
      this.pType = 'password';
    }
  }

  loginUser() {
    if (this.userForm.invalid) {
      return;
    }
    this.isLoading = true;
    this._authService.userLogin(this.userForm.value).subscribe(
      res => {
        this.isLoading = false;
        this._msgService.showSuccess('User logged in successfully');
        this._router.navigate(['home']);
      },
      err => {
        this.isLoading = false;
        this._msgService.showError(err.error.message);
      }
    );
  }
}
