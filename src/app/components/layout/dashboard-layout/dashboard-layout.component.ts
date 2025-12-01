import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="flex h-screen w-full bg-background overflow-hidden relative">
      <!-- Background Shapes -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300/20 blur-[100px]"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300/20 blur-[100px]"></div>
      </div>

      <!-- Sidebar -->
      <app-sidebar class="z-20"></app-sidebar>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <!-- Header -->
        <app-header></app-header>

        <!-- Scrollable Dashboard Content -->
        <main class="flex-1 overflow-y-auto p-4 md:p-8 pt-2">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class DashboardLayoutComponent {}
