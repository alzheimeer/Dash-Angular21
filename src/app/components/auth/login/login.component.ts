import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Welcome Back</h2>
      <p class="text-gray-500 text-sm mt-2">Please enter your details to sign in</p>
    </div>

    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
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
               placeholder="Enter your password">
      </div>

      <div class="flex justify-end">
        <a routerLink="/forgot-password" class="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">Forgot password?</a>
      </div>

      <button type="submit" 
              class="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/20">
        Sign In
      </button>
    </form>

    <div class="relative my-8">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-white/50 px-2 text-gray-400 backdrop-blur-sm rounded">Or continue with</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button (click)="loginWith('google')" class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600">
        <svg class="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Google
      </button>
      <button (click)="loginWith('github')" class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
        GitHub
      </button>
    </div>

    <p class="text-center mt-8 text-sm text-gray-500">
      Don't have an account? 
      <a routerLink="/register" class="font-bold text-gray-900 hover:underline">Sign up</a>
    </p>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email!, password!);
    }
  }

  loginWith(provider: 'google' | 'github') {
    this.authService.loginWithProvider(provider);
  }
}
