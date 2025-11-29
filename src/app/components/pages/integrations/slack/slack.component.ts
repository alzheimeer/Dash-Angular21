import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slack',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col glass-panel rounded-3xl overflow-hidden">
      <!-- Header -->
      <div class="bg-white/50 p-4 border-b border-white/20 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-purple-500"><path d="M6 15a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5zm2-5a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2H9zm0-1a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V9zm-5 2a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2a2 2 0 0 1-2 2zm6 5a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2a2 2 0 0 1-2 2z"/></svg>
          </div>
          <div>
            <h2 class="font-bold text-gray-900">#general</h2>
            <p class="text-xs text-gray-500">Company-wide announcements and work-based matters</p>
          </div>
        </div>
        <div class="flex -space-x-2">
          <img src="https://i.pravatar.cc/150?u=1" class="w-8 h-8 rounded-full border-2 border-white" alt="User">
          <img src="https://i.pravatar.cc/150?u=2" class="w-8 h-8 rounded-full border-2 border-white" alt="User">
          <img src="https://i.pravatar.cc/150?u=3" class="w-8 h-8 rounded-full border-2 border-white" alt="User">
          <div class="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">+42</div>
        </div>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <div class="flex gap-4">
          <img src="https://i.pravatar.cc/150?u=4" class="w-10 h-10 rounded-lg" alt="User">
          <div>
            <div class="flex items-baseline gap-2">
              <span class="font-bold text-gray-900">Sarah Connor</span>
              <span class="text-xs text-gray-400">10:42 AM</span>
            </div>
            <p class="text-gray-700 mt-1">Has anyone seen the latest designs for the dashboard? They look amazing! 🔥</p>
          </div>
        </div>

        <div class="flex gap-4">
          <img src="https://i.pravatar.cc/150?u=1" class="w-10 h-10 rounded-lg" alt="User">
          <div>
            <div class="flex items-baseline gap-2">
              <span class="font-bold text-gray-900">Dilan</span>
              <span class="text-xs text-gray-400">10:45 AM</span>
            </div>
            <p class="text-gray-700 mt-1">Yes! I just pushed the updates to the staging environment. Check it out.</p>
            <div class="mt-2 p-3 bg-white/60 rounded-xl border border-white/50 inline-flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </div>
              <div>
                <p class="text-sm font-bold text-gray-900">dashboard-v2.fig</p>
                <p class="text-xs text-gray-500">Figma File</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="p-4 bg-white/30 border-t border-white/20">
        <div class="bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
          <input type="text" placeholder="Message #general" class="w-full px-3 py-2 outline-none text-sm">
          <div class="flex justify-between items-center mt-2 px-1">
             <div class="flex gap-2 text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
             </div>
             <button class="bg-green-600 text-white p-1.5 rounded-lg hover:bg-green-700 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
             </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SlackComponent {}
