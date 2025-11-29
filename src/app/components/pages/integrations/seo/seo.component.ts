import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col glass-panel rounded-3xl overflow-hidden p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-sm text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20M2 12l5-5m-5 5l5 5"/></svg>
          </div>
          <div>
            <h2 class="font-bold text-gray-900 text-xl">SEO Analytics</h2>
            <p class="text-xs text-gray-500">Performance Overview</p>
          </div>
        </div>
        <div class="flex gap-2">
           <select class="bg-white border-none rounded-lg text-sm font-medium px-3 py-1.5 focus:ring-0 shadow-sm">
             <option>Last 30 Days</option>
             <option>Last 7 Days</option>
           </select>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Organic Traffic</p>
          <h3 class="text-3xl font-bold text-gray-900 mt-2">12,450</h3>
          <span class="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-md mt-2 inline-block">+12.5%</span>
        </div>
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Keywords Ranked</p>
          <h3 class="text-3xl font-bold text-gray-900 mt-2">842</h3>
          <span class="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-md mt-2 inline-block">+5.2%</span>
        </div>
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg. Position</p>
          <h3 class="text-3xl font-bold text-gray-900 mt-2">14.2</h3>
          <span class="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-md mt-2 inline-block">-1.2%</span>
        </div>
      </div>

      <!-- Keywords Table -->
      <div class="flex-1 bg-white/50 rounded-2xl p-4 overflow-hidden flex flex-col">
        <h3 class="font-bold text-gray-900 mb-4">Top Keywords</h3>
        <div class="flex-1 overflow-y-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="text-xs text-gray-400 border-b border-gray-200">
                <th class="pb-2 font-bold uppercase">Keyword</th>
                <th class="pb-2 font-bold uppercase">Position</th>
                <th class="pb-2 font-bold uppercase">Volume</th>
                <th class="pb-2 font-bold uppercase">Traffic</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr class="border-b border-gray-100 last:border-0">
                <td class="py-3 font-medium text-gray-900">dashboard ui kit</td>
                <td class="py-3 text-green-600 font-bold">1</td>
                <td class="py-3 text-gray-500">2.4k</td>
                <td class="py-3 text-gray-500">1.2k</td>
              </tr>
              <tr class="border-b border-gray-100 last:border-0">
                <td class="py-3 font-medium text-gray-900">angular admin template</td>
                <td class="py-3 text-green-600 font-bold">3</td>
                <td class="py-3 text-gray-500">5.1k</td>
                <td class="py-3 text-gray-500">850</td>
              </tr>
              <tr class="border-b border-gray-100 last:border-0">
                <td class="py-3 font-medium text-gray-900">tailwind dashboard</td>
                <td class="py-3 text-green-600 font-bold">5</td>
                <td class="py-3 text-gray-500">3.8k</td>
                <td class="py-3 text-gray-500">620</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class SeoComponent {}
