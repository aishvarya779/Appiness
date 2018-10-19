import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'appi-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userForm: FormGroup;
  public pType = 'password';
  constructor(private _fb: FormBuilder, private _router: Router) {}

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
    this._router.navigate(['home']);
  }
}
