import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
  ){}

  public registerForm = new FormGroup({
    password: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    user: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)]}),
    email: new FormControl<string>('', { nonNullable: true,validators: [Validators.required, Validators.email]  }),
  })

  get currentRegisterUser(): User{
    const user = this.registerForm.value as User;
    return user;
  }

  onSubmit():void{
    if(this.registerForm.invalid) return;

    this.authService.addUser(this.currentRegisterUser)
      .subscribe(user => {
        this.router.navigate(['/auth/login'])
        this.showSnackBar(`Usuario creado! Ingrese con las nuevas credenciales.`);
      })
  }

  showSnackBar(message: string): void{
    this.snackbar.open(message, 'done', {
      duration: 2500,
    })
  }
}
