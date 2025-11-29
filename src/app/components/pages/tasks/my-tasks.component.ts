import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col gap-6">
      <!-- Header & Filters -->
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">My Tasks</h2>
          <p class="text-gray-500 text-sm mt-1">You have {{ pendingTasksCount() }} pending tasks</p>
        </div>
        
        <div class="flex bg-white rounded-xl p-1 shadow-sm">
          @for (filter of filters; track filter) {
            <button (click)="activeFilter.set(filter)"
                    class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    [class.bg-black]="activeFilter() === filter"
                    [class.text-white]="activeFilter() === filter"
                    [class.text-gray-500]="activeFilter() !== filter"
                    [class.hover:text-gray-900]="activeFilter() !== filter">
              {{ filter }}
            </button>
          }
        </div>
      </div>

      <!-- Tasks List -->
      <div class="flex-1 glass-panel rounded-3xl p-6 overflow-hidden flex flex-col">
        <div class="overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          @for (task of filteredTasks(); track task.id) {
            <div class="group flex items-center gap-4 p-4 rounded-2xl bg-white/40 border border-white/50 hover:bg-white/80 transition-all cursor-pointer">
              <!-- Checkbox -->
              <div class="relative flex items-center justify-center w-6 h-6">
                <input type="checkbox" 
                       [checked]="task.completed" 
                       (change)="toggleTask(task.id)"
                       class="peer appearance-none w-6 h-6 border-2 border-gray-300 rounded-lg checked:bg-black checked:border-black transition-colors cursor-pointer">
                <svg class="absolute w-3.5 h-3.5 text-white hidden peer-checked:block pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <!-- Task Info -->
              <div class="flex-1">
                <h4 class="font-bold text-gray-900" [class.line-through]="task.completed" [class.text-gray-400]="task.completed">{{ task.title }}</h4>
                <p class="text-xs text-gray-500 mt-0.5">{{ task.project }} • {{ task.date }}</p>
              </div>

              <!-- Tags -->
              <div class="flex gap-2">
                @for (tag of task.tags; track tag) {
                  <span class="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide"
                        [ngClass]="getTagColor(tag)">
                    {{ tag }}
                  </span>
                }
              </div>

              <!-- Avatar -->
              <div class="flex -space-x-2">
                 @for (user of task.assignees; track user) {
                   <img [src]="user" class="w-8 h-8 rounded-full border-2 border-white" alt="Assignee">
                 }
              </div>
              
              <!-- Actions -->
              <button class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors opacity-0 group-hover:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class MyTasksComponent {
  filters = ['All', 'Pending', 'Completed'];
  activeFilter = signal('All');

  tasks = signal([
    { 
      id: 1, 
      title: 'Create new landing page design', 
      project: 'Marketing Website', 
      date: 'Today, 10:00 AM', 
      completed: false, 
      tags: ['Design', 'Urgent'],
      assignees: ['https://i.pravatar.cc/150?u=1']
    },
    { 
      id: 2, 
      title: 'Fix navigation bug on mobile', 
      project: 'App Development', 
      date: 'Today, 02:00 PM', 
      completed: false, 
      tags: ['Dev', 'Bug'],
      assignees: ['https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3']
    },
    { 
      id: 3, 
      title: 'Prepare monthly report', 
      project: 'Analytics', 
      date: 'Yesterday', 
      completed: true, 
      tags: ['Admin'],
      assignees: ['https://i.pravatar.cc/150?u=1']
    },
    { 
      id: 4, 
      title: 'Client meeting preparation', 
      project: 'Sales', 
      date: 'Sep 12', 
      completed: true, 
      tags: ['Meeting'],
      assignees: ['https://i.pravatar.cc/150?u=4']
    },
    { 
      id: 5, 
      title: 'Update documentation', 
      project: 'Internal', 
      date: 'Sep 10', 
      completed: false, 
      tags: ['Docs'],
      assignees: ['https://i.pravatar.cc/150?u=5']
    }
  ]);

  filteredTasks = computed(() => {
    const filter = this.activeFilter();
    const tasks = this.tasks();
    if (filter === 'All') return tasks;
    if (filter === 'Pending') return tasks.filter(t => !t.completed);
    if (filter === 'Completed') return tasks.filter(t => t.completed);
    return tasks;
  });

  pendingTasksCount = computed(() => this.tasks().filter(t => !t.completed).length);

  toggleTask(id: number) {
    this.tasks.update(tasks => 
      tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }

  getTagColor(tag: string): string {
    const colors: Record<string, string> = {
      'Design': 'bg-purple-100 text-purple-700',
      'Urgent': 'bg-red-100 text-red-700',
      'Dev': 'bg-blue-100 text-blue-700',
      'Bug': 'bg-orange-100 text-orange-700',
      'Admin': 'bg-gray-100 text-gray-700',
      'Meeting': 'bg-green-100 text-green-700',
      'Docs': 'bg-yellow-100 text-yellow-700'
    };
    return colors[tag] || 'bg-gray-100 text-gray-700';
  }
}
