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
  
  VerficarUsuario() {
    console.log('usuario login');
    // Redirigir a otro componente (por ejemplo, '/home')
    this.router.navigate(['/menu']);
  }


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
}
