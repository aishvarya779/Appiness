import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) {}

  public showSuccess(msg) {
    let config: MatSnackBarConfig = {
      duration: 2000,
      panelClass: 'successMessage',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    };
    this.snackBar.open(msg, null, config);
  }

  public showError(msg) {
    let config: MatSnackBarConfig = {
      duration: 2000,
      panelClass: 'errorMessage',
      verticalPosition: 'top',
      horizontalPosition: 'right'
    };
    this.snackBar.open(msg, null, config);
  }
}
