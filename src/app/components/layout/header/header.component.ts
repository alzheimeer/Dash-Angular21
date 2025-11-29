import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="flex justify-between items-center px-8 py-6">
      <!-- Search -->
      <div class="relative w-96">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <input type="text" 
               class="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all shadow-sm" 
               placeholder="Search">
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <button class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-gray-900 shadow-sm transition-colors relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <span class="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div class="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div class="text-right hidden md:block">
            <p class="text-sm font-bold text-gray-900 leading-none">{{ currentUser()?.name }}</p>
            <p class="text-xs text-gray-500 mt-1">Project Manager</p>
          </div>
          <div class="relative group">
             <img [src]="currentUser()?.avatar" alt="User" class="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer">
             
             <!-- Dropdown Menu -->
             <div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2">
               <button (click)="logout()" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                 Sign out
               </button>
             </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  logout() {
    this.authService.logout();
  }
}
