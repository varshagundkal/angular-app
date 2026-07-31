import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder)
  private authService = inject(Auth)
  private router = inject(Router)
  errormessage: string | null = null;
  
  loginForm: FormGroup = this.fb.group({
    // email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit() {
    if(this.loginForm.invalid) {
      return;
    }

    let credentials = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe({
      
      next: () => {
        console.log("ttttt")
        this.router.navigateByUrl('/dashboard')
      },
      error: (err) => {
        console.log("error:: ", err)
        this.errormessage = err.message
      }
    })
  }







  

}

