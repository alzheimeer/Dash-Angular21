import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Reset Password</h2>
      <p class="text-gray-500 text-sm mt-2">Enter your email to receive instructions</p>
    </div>

    @if (submitted()) {
      <div class="bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-sm text-center">
        If an account exists with that email, we've sent password reset instructions.
      </div>
      <button routerLink="/login" class="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/20">
        Back to Login
      </button>
    } @else {
      <form [formGroup]="resetForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1 ml-1">Email</label>
          <input type="email" formControlName="email" 
                 class="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 focus:bg-white focus:ring-2 focus:ring-black/5 focus:outline-none transition-all"
                 placeholder="Enter your email">
        </div>

        <button type="submit" 
                class="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 mt-2">
          Send Instructions
        </button>
      </form>

      <p class="text-center mt-8 text-sm text-gray-500">
        Remember your password? 
        <a routerLink="/login" class="font-bold text-gray-900 hover:underline">Sign in</a>
      </p>
    }
  `
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  
  submitted = signal(false);

  resetForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    if (this.resetForm.valid) {
      this.authService.recoverPassword(this.resetForm.value.email!);
      this.submitted.set(true);
    }
  }
}
