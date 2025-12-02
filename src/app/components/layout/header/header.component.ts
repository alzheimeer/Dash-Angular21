import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="flex justify-between items-center px-4 md:px-8 py-6 gap-4 relative z-30">
      <!-- Left Section: Hamburger + Search -->
      <div class="flex items-center gap-4 flex-1">
        <!-- Hamburger Menu -->
        <button (click)="layoutService.toggleSidebar()" class="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        <!-- Search -->
        <div class="relative w-full md:w-96">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <input type="text" 
                 class="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-white/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all shadow-sm" 
                 placeholder="Search">
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 md:gap-4">
        <button class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-gray-900 shadow-sm transition-colors relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <span class="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div class="flex items-center gap-3 pl-2 md:pl-4 border-l border-gray-200">
          <div class="text-right hidden md:block">
            <p class="text-sm font-bold text-gray-900 leading-none">{{ currentUser()?.name }}</p>
            <p class="text-xs text-gray-500 mt-1">Project Manager</p>
          </div>
          <div class="relative group">
             <img [src]="currentUser()?.avatar" alt="User" class="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer" (click)="toggleUserMenu()">
             <div class="absolute right-0 top-full pt-2 w-48 z-50 animate-in fade-in slide-in-from-top-2" [ngClass]="menuOpen ? 'block' : 'hidden md:group-hover:block'">
               <div class="bg-white rounded-xl shadow-lg py-1">
                 <button (click)="logout()" class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                   Sign out
                 </button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  authService = inject(AuthService);
  layoutService = inject(LayoutService);
  currentUser = this.authService.currentUser;
  menuOpen = false;

  logout() {
    this.authService.logout();
  }

  toggleUserMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
