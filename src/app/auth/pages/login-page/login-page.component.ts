import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
  ){}

  onLogin(email: string, password: string): void {
    this.authService.login(email, password)
      .subscribe(user => {
        if(!user){
          this.router.navigate(['/auth/login'])
          this.showSnackBar(`No se encontró el usuario ${email}.`);
          return;
        }
        if(user.password !== password){
          this.router.navigate(['/auth/login'])
          this.showSnackBar(`La contraseña no es válida.`);
          return;
        }

        this.authService.setCurrentUser = user;
        console.log(this.authService.currentUser)
        this.router.navigate(['/'])
      })
  }

  showSnackBar(message: string): void{
    this.snackbar.open(message, 'done', {
      duration: 2500,
    })
  }
}
