import { Component, signal, inject, computed } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Mobile Backdrop -->
    @if (layoutService.isMobileSidebarOpen()) {
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" (click)="layoutService.closeSidebar()"></div>
    }

    <aside [class.translate-x-0]="layoutService.isMobileSidebarOpen()"
           [class.-translate-x-full]="!layoutService.isMobileSidebarOpen()"
           class="fixed inset-y-0 left-0 z-50 w-64 h-full flex flex-col py-6 px-4 glass-panel border-r-0 rounded-r-3xl my-4 ml-4 transition-transform duration-300 md:translate-x-0 md:static md:h-full md:my-4 md:ml-4 md:z-auto">
      
      <!-- Logo & Close Button -->
      <div class="flex items-center justify-between mb-10 px-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span class="text-xl font-bold tracking-tight text-gray-900">iDraft</span>
        </div>
        
        <!-- Mobile Close Button -->
        <button (click)="layoutService.closeSidebar()" class="md:hidden p-1 text-gray-500 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-1">
        @for (item of menuItems(); track item.label) {
          <a [routerLink]="item.route" 
             (click)="layoutService.closeSidebar()"
             routerLinkActive="bg-gray-900 text-white shadow-lg" 
             [routerLinkActiveOptions]="{exact: item.exact}"
             class="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-gray-600 hover:bg-white/50">
            <span [innerHTML]="item.icon"></span>
            {{ item.label }}
          </a>
        }
      </nav>

      <!-- Integrations (Apps) -->
      @if (activeApps().length > 0) {
        <div class="mt-8">
          <h3 class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Integrations</h3>
          <div class="space-y-1">
            @for (app of activeApps(); track app.id) {
              <a [routerLink]="['/integration', app.id]" 
                 (click)="layoutService.closeSidebar()"
                 routerLinkActive="bg-white/80 text-gray-900 shadow-sm"
                 class="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 rounded-xl hover:bg-white/50 transition-all duration-200">
                <div class="w-5 h-5 flex items-center justify-center" [innerHTML]="sanitizer.bypassSecurityTrustHtml(app.icon)"></div>
                {{ app.name }}
              </a>
            }
            <a routerLink="/settings" (click)="layoutService.closeSidebar()" class="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-500 rounded-xl hover:bg-white/50 transition-all duration-200 w-full text-left">
              <div class="w-5 h-5 border border-dashed border-gray-400 rounded-full flex items-center justify-center">
                <span class="text-xs">+</span>
              </div>
              Add new plugin
            </a>
          </div>
        </div>
      }

      <!-- Teams (Plugins) -->
      @if (activePlugins().length > 0) {
        <div class="mt-8 mb-4">
          <h3 class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Teams</h3>
          <div class="space-y-1">
            @for (plugin of activePlugins(); track plugin.id) {
              <a [routerLink]="['/integration', plugin.id]" 
                 (click)="layoutService.closeSidebar()"
                 routerLinkActive="bg-white/80 text-gray-900 shadow-sm"
                 class="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 rounded-xl hover:bg-white/50 transition-all duration-200">
                <div class="w-5 h-5 flex items-center justify-center" [innerHTML]="sanitizer.bypassSecurityTrustHtml(plugin.icon)"></div>
                {{ plugin.name }}
              </a>
            }
          </div>
        </div>
      }

      <!-- Settings -->
      <div class="mt-auto">
        <a routerLink="/settings" 
           (click)="layoutService.closeSidebar()"
           routerLinkActive="bg-gray-900 text-white shadow-lg" 
           class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-white/50 transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Settings
        </a>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  public sanitizer = inject(DomSanitizer);
  private readonly authService = inject(AuthService);
  public layoutService = inject(LayoutService);

  activeApps = computed(() => {
    const user = this.authService.currentUser();
    return user?.integrations?.filter(i => i.connected && i.type === 'app') || [];
  });

  activePlugins = computed(() => {
    const user = this.authService.currentUser();
    return user?.integrations?.filter(i => i.connected && i.type === 'plugin') || [];
  });

  menuItems = signal([
    { 
      label: 'Dashboard', 
      route: '/', 
      exact: true,
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`)
    },
    { 
      label: 'Calendar', 
      route: '/calendar', 
      exact: false,
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`)
    },
    { 
      label: 'My Tasks', 
      route: '/tasks', 
      exact: false,
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>`)
    },
    { 
      label: 'Statistics', 
      route: '/statistics', 
      exact: false,
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`)
    },
    { 
      label: 'Documents', 
      route: '/documents', 
      exact: false,
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`)
    }
  ]);
}
