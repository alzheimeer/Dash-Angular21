import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col glass-panel rounded-3xl overflow-hidden p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-blue-600"><path d="M2 10h20v4H2z"/></svg>
          </div>
          <div>
            <h2 class="font-bold text-gray-900 text-xl">Microsoft Teams</h2>
            <p class="text-xs text-gray-500">Upcoming Meetings</p>
          </div>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
          New Meeting
        </button>
      </div>

      <!-- Meetings List -->
      <div class="space-y-4">
        <div class="bg-white/60 p-4 rounded-2xl border border-white/50 flex items-center justify-between group hover:bg-white/80 transition-colors cursor-pointer">
          <div class="flex items-center gap-4">
            <div class="flex flex-col items-center justify-center w-14 h-14 bg-blue-50 rounded-xl text-blue-600">
              <span class="text-xs font-bold uppercase">Today</span>
              <span class="text-xl font-bold">14:00</span>
            </div>
            <div>
              <h4 class="font-bold text-gray-900">Weekly Sync</h4>
              <p class="text-sm text-gray-500">General Channel</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex -space-x-2">
              <img src="https://i.pravatar.cc/150?u=1" class="w-8 h-8 rounded-full border-2 border-white" alt="User">
              <img src="https://i.pravatar.cc/150?u=2" class="w-8 h-8 rounded-full border-2 border-white" alt="User">
              <img src="https://i.pravatar.cc/150?u=3" class="w-8 h-8 rounded-full border-2 border-white" alt="User">
            </div>
            <button class="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50">Join</button>
          </div>
        </div>

        <div class="bg-white/60 p-4 rounded-2xl border border-white/50 flex items-center justify-between group hover:bg-white/80 transition-colors cursor-pointer">
          <div class="flex items-center gap-4">
            <div class="flex flex-col items-center justify-center w-14 h-14 bg-purple-50 rounded-xl text-purple-600">
              <span class="text-xs font-bold uppercase">Tom</span>
              <span class="text-xl font-bold">10:00</span>
            </div>
            <div>
              <h4 class="font-bold text-gray-900">Design Review</h4>
              <p class="text-sm text-gray-500">Design Team</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex -space-x-2">
              <img src="https://i.pravatar.cc/150?u=4" class="w-8 h-8 rounded-full border-2 border-white" alt="User">
              <img src="https://i.pravatar.cc/150?u=5" class="w-8 h-8 rounded-full border-2 border-white" alt="User">
            </div>
            <button class="px-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50">RSVP</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TeamsComponent {}
