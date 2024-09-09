import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log('Datos de inicio de sesión:', loginData);
      // Aquí puedes manejar la autenticación
    }
  }

  VerficarUsuario(): void {
    // Check if the form is valid before proceeding
   // if (this.loginForm.valid) {
      console.log('usuario login', this.loginForm.value);
      // Redirect to another component (for example, '/menu')
      this.router.navigate(['/menu']);
    // } else {
    //   console.log('Login form is invalid');
   // }
  }

}
