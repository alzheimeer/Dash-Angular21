import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col glass-panel rounded-3xl overflow-hidden p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-linear-to-br from-pink-500 to-orange-400 rounded-xl flex items-center justify-center shadow-sm text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <div>
            <h2 class="font-bold text-gray-900 text-xl">Marketing Pack</h2>
            <p class="text-xs text-gray-500">Campaign Management</p>
          </div>
        </div>
        <button class="bg-black text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-black/20">
          Create Campaign
        </button>
      </div>

      <!-- Active Campaigns -->
      <div class="grid grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </div>
          
          <div class="flex justify-between items-start mb-4">
            <span class="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Active</span>
            <button class="text-gray-400 hover:text-gray-900">...</button>
          </div>
          
          <h3 class="text-xl font-bold text-gray-900">Summer Sale 2023</h3>
          <p class="text-sm text-gray-500 mt-1">Social Media & Email</p>
          
          <div class="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase">Reach</p>
              <p class="text-lg font-bold text-gray-900">45.2k</p>
            </div>
            <div>
              <p class="text-[10px] font-bold text-gray-400 uppercase">Conversion</p>
              <p class="text-lg font-bold text-gray-900">3.4%</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>

          <div class="flex justify-between items-start mb-4">
            <span class="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">Scheduled</span>
            <button class="text-gray-400 hover:text-gray-900">...</button>
          </div>
          
          <h3 class="text-xl font-bold text-gray-900">Black Friday Prep</h3>
          <p class="text-sm text-gray-500 mt-1">Email Newsletter</p>
          
          <div class="mt-6">
            <p class="text-[10px] font-bold text-gray-400 uppercase mb-1">Launch Date</p>
            <p class="text-lg font-bold text-gray-900">Nov 24, 2023</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MarketingComponent {}
