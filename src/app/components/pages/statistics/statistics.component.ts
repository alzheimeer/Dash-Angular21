import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col gap-6">
      <h2 class="text-2xl font-bold text-gray-900">Statistics</h2>

      <!-- KPIs -->
      <div class="grid grid-cols-4 gap-6">
        @for (kpi of kpis; track kpi.label) {
          <div class="glass-panel rounded-3xl p-6 flex flex-col">
            <div class="flex justify-between items-start mb-4">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center" [ngClass]="kpi.bg">
                <span [innerHTML]="kpi.icon" [ngClass]="kpi.color"></span>
              </div>
              <span class="text-xs font-bold px-2 py-1 rounded-md" 
                    [class.bg-green-100]="kpi.trend > 0" [class.text-green-700]="kpi.trend > 0"
                    [class.bg-red-100]="kpi.trend < 0" [class.text-red-700]="kpi.trend < 0">
                {{ kpi.trend > 0 ? '+' : '' }}{{ kpi.trend }}%
              </span>
            </div>
            <h3 class="text-3xl font-bold text-gray-900">{{ kpi.value }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ kpi.label }}</p>
          </div>
        }
      </div>

      <div class="flex-1 grid grid-cols-3 gap-6 min-h-0">
        <!-- Main Chart -->
        <div class="col-span-2 glass-panel rounded-3xl p-6 flex flex-col">
          <div class="flex justify-between items-center mb-8">
            <h3 class="text-lg font-bold text-gray-900">Activity Overview</h3>
            <select class="bg-gray-100 border-none rounded-lg text-sm font-medium px-3 py-1.5 focus:ring-0">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          
          <div class="flex-1 flex items-end justify-between gap-4 px-4 pb-4">
            @for (bar of chartData; track bar.month) {
              <div class="flex flex-col items-center gap-2 flex-1 group">
                <div class="w-full bg-gray-100 rounded-t-lg relative overflow-hidden h-64 flex items-end">
                   <div class="w-full bg-black transition-all duration-500 group-hover:bg-purple-600 rounded-t-lg" 
                        [style.height.%]="bar.value"></div>
                </div>
                <span class="text-xs font-medium text-gray-400 group-hover:text-gray-900">{{ bar.month }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Project Breakdown -->
        <div class="glass-panel rounded-3xl p-6 flex flex-col">
          <h3 class="text-lg font-bold text-gray-900 mb-6">Time by Project</h3>
          
          <div class="flex-1 flex items-center justify-center relative">
             <!-- Donut Chart Mock -->
             <svg viewBox="0 0 100 100" class="w-48 h-48 transform -rotate-90">
               <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" stroke-width="20" />
               <circle cx="50" cy="50" r="40" fill="none" stroke="#000000" stroke-width="20" stroke-dasharray="150 251" />
               <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" stroke-width="20" stroke-dasharray="70 251" stroke-dashoffset="-150" />
               <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="20" stroke-dasharray="30 251" stroke-dashoffset="-220" />
             </svg>
             <div class="absolute text-center">
               <span class="block text-3xl font-bold text-gray-900">142</span>
               <span class="text-xs text-gray-500 uppercase tracking-wide">Hours</span>
             </div>
          </div>

          <div class="space-y-3 mt-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-black"></div>
                <span class="text-sm font-medium text-gray-600">App Design</span>
              </div>
              <span class="text-sm font-bold text-gray-900">60%</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                <span class="text-sm font-medium text-gray-600">Marketing</span>
              </div>
              <span class="text-sm font-bold text-gray-900">28%</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                <span class="text-sm font-medium text-gray-600">Research</span>
              </div>
              <span class="text-sm font-bold text-gray-900">12%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StatisticsComponent {
  kpis = [
    { 
      label: 'Total Projects', 
      value: '24', 
      trend: 12, 
      icon: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>',
      bg: 'bg-blue-50', color: 'text-blue-600'
    },
    { 
      label: 'Completed Tasks', 
      value: '185', 
      trend: 8, 
      icon: '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',
      bg: 'bg-green-50', color: 'text-green-600'
    },
    { 
      label: 'Hours Tracked', 
      value: '342', 
      trend: -2.4, 
      icon: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
      bg: 'bg-purple-50', color: 'text-purple-600'
    },
    { 
      label: 'Upcoming Deadlines', 
      value: '3', 
      trend: 0, 
      icon: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
      bg: 'bg-orange-50', color: 'text-orange-600'
    }
  ];

  chartData = [
    { month: 'Jan', value: 40 },
    { month: 'Feb', value: 65 },
    { month: 'Mar', value: 45 },
    { month: 'Apr', value: 80 },
    { month: 'May', value: 55 },
    { month: 'Jun', value: 90 },
    { month: 'Jul', value: 70 },
    { month: 'Aug', value: 85 },
    { month: 'Sep', value: 60 },
    { month: 'Oct', value: 75 },
    { month: 'Nov', value: 50 },
    { month: 'Dec', value: 80 }
  ];
}
