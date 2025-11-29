import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col glass-panel rounded-3xl overflow-hidden p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-black"><path d="M4.222 2.889A.889.889 0 0 0 3.333 3.778v16.444c0 .491.398.889.889.889h15.556a.889.889 0 0 0 .889-.889V3.778a.889.889 0 0 0-.889-.889H4.222zM17.111 18.222H6.889V5.778h10.222v12.444z"/></svg>
          </div>
          <div>
            <h2 class="font-bold text-gray-900 text-xl">Product Roadmap</h2>
            <p class="text-xs text-gray-500">Q4 2023 Goals</p>
          </div>
        </div>
        <div class="flex gap-2">
           <span class="px-3 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">Board View</span>
           <span class="px-3 py-1 text-xs font-medium text-gray-400 hover:text-gray-600 cursor-pointer">Table View</span>
        </div>
      </div>

      <!-- Kanban Board -->
      <div class="flex-1 grid grid-cols-3 gap-6 overflow-x-auto">
        <!-- Column: To Do -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">To Do <span class="text-gray-400 ml-1">3</span></span>
            <button class="text-gray-400 hover:text-gray-600">+</button>
          </div>
          
          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
            <h4 class="font-bold text-gray-900 text-sm">Research Competitors</h4>
            <div class="mt-3 flex items-center gap-2">
              <span class="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded uppercase">High</span>
              <img src="https://i.pravatar.cc/150?u=5" class="w-5 h-5 rounded-full ml-auto" alt="User">
            </div>
          </div>

          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
            <h4 class="font-bold text-gray-900 text-sm">Draft User Stories</h4>
            <div class="mt-3 flex items-center gap-2">
              <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">Product</span>
              <img src="https://i.pravatar.cc/150?u=6" class="w-5 h-5 rounded-full ml-auto" alt="User">
            </div>
          </div>
        </div>

        <!-- Column: In Progress -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-gray-500 bg-blue-50 px-2 py-1 rounded">In Progress <span class="text-gray-400 ml-1">2</span></span>
            <button class="text-gray-400 hover:text-gray-600">+</button>
          </div>

          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
            <h4 class="font-bold text-gray-900 text-sm">Design System Update</h4>
            <div class="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div class="bg-blue-500 h-full w-2/3"></div>
            </div>
            <div class="mt-3 flex items-center gap-2">
              <span class="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded uppercase">Design</span>
              <div class="flex -space-x-1 ml-auto">
                 <img src="https://i.pravatar.cc/150?u=1" class="w-5 h-5 rounded-full border border-white" alt="User">
                 <img src="https://i.pravatar.cc/150?u=2" class="w-5 h-5 rounded-full border border-white" alt="User">
              </div>
            </div>
          </div>
        </div>

        <!-- Column: Done -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-gray-500 bg-green-50 px-2 py-1 rounded">Done <span class="text-gray-400 ml-1">1</span></span>
            <button class="text-gray-400 hover:text-gray-600">+</button>
          </div>

          <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 opacity-75">
            <h4 class="font-bold text-sm line-through text-gray-400">Q3 Review Meeting</h4>
            <div class="mt-3 flex items-center gap-2">
              <span class="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Done</span>
              <img src="https://i.pravatar.cc/150?u=3" class="w-5 h-5 rounded-full ml-auto" alt="User">
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NotionComponent {}
