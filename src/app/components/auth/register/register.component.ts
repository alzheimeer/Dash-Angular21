import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Create Account</h2>
      <p class="text-gray-500 text-sm mt-2">Join us and start managing your tasks</p>
    </div>

    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1 ml-1">Full Name</label>
        <input type="text" formControlName="name" 
               class="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 focus:bg-white focus:ring-2 focus:ring-black/5 focus:outline-none transition-all"
               placeholder="Enter your name">
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1 ml-1">Email</label>
        <input type="email" formControlName="email" 
               class="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 focus:bg-white focus:ring-2 focus:ring-black/5 focus:outline-none transition-all"
               placeholder="Enter your email">
      </div>
      
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1 ml-1">Password</label>
        <input type="password" formControlName="password" 
               class="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 focus:bg-white focus:ring-2 focus:ring-black/5 focus:outline-none transition-all"
               placeholder="Create a password">
      </div>

      <button type="submit" 
              class="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 mt-2">
        Sign Up
      </button>
    </form>

    <p class="text-center mt-8 text-sm text-gray-500">
      Already have an account? 
      <a routerLink="/login" class="font-bold text-gray-900 hover:underline">Sign in</a>
    </p>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      this.authService.register(name!, email!, password!);
    }
  }
}
