import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex h-full gap-6">
      <!-- Main Calendar Area -->
      <div class="flex-1 glass-panel rounded-3xl p-6 flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">September 2023</h2>
          <div class="flex gap-2">
            <button class="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button class="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>

        <!-- Days Header -->
        <div class="grid grid-cols-7 mb-4">
          @for (day of weekDays; track day) {
            <div class="text-center text-xs font-bold text-gray-400 uppercase tracking-wider">{{ day }}</div>
          }
        </div>

        <!-- Calendar Grid -->
        <div class="flex-1 grid grid-cols-7 grid-rows-5 gap-2">
          @for (date of calendarDays(); track $index) {
            <div class="relative rounded-xl border border-white/30 p-2 transition-all hover:bg-white/40 group cursor-pointer"
                 [class.bg-white_50]="date.isCurrentMonth"
                 [class.bg-white_10]="!date.isCurrentMonth"
                 [class.opacity-50]="!date.isCurrentMonth">
              
              <span class="text-sm font-medium" 
                    [class.text-gray-900]="date.isCurrentMonth"
                    [class.text-gray-400]="!date.isCurrentMonth"
                    [class.bg-black]="date.isToday"
                    [class.text-white]="date.isToday"
                    [class.w-6]="date.isToday"
                    [class.h-6]="date.isToday"
                    [class.rounded-full]="date.isToday"
                    [class.flex]="date.isToday"
                    [class.items-center]="date.isToday"
                    [class.justify-center]="date.isToday">
                {{ date.day }}
              </span>

              <!-- Events Dots -->
              @if (date.events.length > 0) {
                <div class="absolute bottom-2 left-2 flex gap-1">
                  @for (event of date.events; track event.id) {
                    <div class="w-1.5 h-1.5 rounded-full" [ngClass]="event.color"></div>
                  }
                </div>
              }
            </div>
          }
        </div>
      </div>

      <!-- Sidebar / Upcoming Events -->
      <div class="w-80 flex flex-col gap-6">
        <!-- Add Event Button -->
        <button class="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add New Event
        </button>

        <!-- Upcoming List -->
        <div class="glass-panel rounded-3xl p-6 flex-1">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
          <div class="space-y-4">
            @for (event of upcomingEvents(); track event.id) {
              <div class="flex gap-4 items-start group cursor-pointer">
                <div class="w-12 flex flex-col items-center justify-center bg-white rounded-xl py-2 shadow-sm group-hover:scale-105 transition-transform">
                  <span class="text-xs font-bold text-gray-400">{{ event.month }}</span>
                  <span class="text-lg font-bold text-gray-900">{{ event.day }}</span>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 text-sm">{{ event.title }}</h4>
                  <p class="text-xs text-gray-500 mt-1">{{ event.time }}</p>
                  <div class="flex -space-x-2 mt-2">
                    @for (avatar of event.attendees; track avatar) {
                      <img [src]="avatar" class="w-6 h-6 rounded-full border-2 border-white" alt="Attendee">
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class CalendarComponent {
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Mock data generator for calendar grid
  calendarDays = signal(Array.from({ length: 35 }, (_, i) => {
    const day = i - 3; // Start from previous month
    const isCurrentMonth = day > 0 && day <= 30;
    const isToday = day === 14;
    
    let events = [];
    if (day === 5) events.push({ id: 1, color: 'bg-blue-500' });
    if (day === 14) events.push({ id: 2, color: 'bg-purple-500' }, { id: 3, color: 'bg-yellow-500' });
    if (day === 22) events.push({ id: 4, color: 'bg-red-500' });

    return {
      day: day <= 0 ? 31 + day : (day > 30 ? day - 30 : day),
      isCurrentMonth,
      isToday,
      events
    };
  }));

  upcomingEvents = signal([
    {
      id: 1,
      title: 'Design Review',
      time: '10:00 AM - 11:30 AM',
      day: '14',
      month: 'Sep',
      attendees: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3']
    },
    {
      id: 2,
      title: 'Team Meeting',
      time: '02:00 PM - 03:00 PM',
      day: '15',
      month: 'Sep',
      attendees: ['https://i.pravatar.cc/150?u=4', 'https://i.pravatar.cc/150?u=5']
    },
    {
      id: 3,
      title: 'Client Call',
      time: '04:30 PM - 05:00 PM',
      day: '18',
      month: 'Sep',
      attendees: ['https://i.pravatar.cc/150?u=6']
    }
  ]);
}
