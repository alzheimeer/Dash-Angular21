import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen w-full bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <!-- Background Shapes -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-400/20 blur-[120px]"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px]"></div>
      </div>

      <!-- Auth Container -->
      <div class="w-full max-w-md">
        <div class="glass-panel rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
           <!-- Decorative top light -->
           <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-linear-to-r from-transparent via-white/50 to-transparent"></div>
           
           <router-outlet></router-outlet>
        </div>
        
        <!-- Footer Links -->
        <div class="mt-6 text-center text-sm text-gray-500">
          <p>&copy; 2025 Alzheimeer Dashboard Angular 21. All rights reserved.</p>
        </div>
      </div>
    </div>
  `
})
export class AuthLayoutComponent {}
