import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col gap-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Documents</h2>
          <div class="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span class="hover:text-gray-900 cursor-pointer">Home</span>
            <span>/</span>
            <span class="font-medium text-gray-900">Work Projects</span>
          </div>
        </div>
        
        <div class="flex gap-3 w-full md:w-auto">
          <button class="flex-1 md:flex-none px-4 py-2 bg-white text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-sm border border-gray-100 text-center justify-center">
            Create Folder
          </button>
          <button class="flex-1 md:flex-none px-4 py-2 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 text-sm flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Upload File
          </button>
        </div>
      </div>

      <!-- Folders Grid -->
      <div>
        <h3 class="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Folders</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          @for (folder of folders; track folder.name) {
            <div class="glass-panel rounded-2xl p-4 flex items-center gap-4 hover:bg-white/60 transition-colors cursor-pointer group">
              <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
              </div>
              <div>
                <h4 class="font-bold text-gray-900 text-sm">{{ folder.name }}</h4>
                <p class="text-xs text-gray-500">{{ folder.items }} items • {{ folder.size }}</p>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Recent Files -->
      <div class="flex-1 glass-panel rounded-3xl p-6 flex flex-col">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Recent Files</h3>
        <div class="flex-1 overflow-y-auto pr-2">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-xs text-gray-400 border-b border-gray-100">
                <th class="font-bold uppercase tracking-wider py-3 pl-2">Name</th>
                <th class="font-bold uppercase tracking-wider py-3 hidden md:table-cell">Date Modified</th>
                <th class="font-bold uppercase tracking-wider py-3 hidden md:table-cell">Size</th>
                <th class="font-bold uppercase tracking-wider py-3 hidden md:table-cell">Members</th>
                <th class="font-bold uppercase tracking-wider py-3"></th>
              </tr>
            </thead>
            <tbody class="text-sm">
              @for (file of files; track file.name) {
                <tr class="group hover:bg-white/50 transition-colors rounded-lg">
                  <td class="py-3 pl-2">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg flex items-center justify-center" [ngClass]="getFileIconColor(file.type)">
                        <span class="font-bold text-[10px] uppercase">{{ file.type }}</span>
                      </div>
                      <span class="font-medium text-gray-900">{{ file.name }}</span>
                    </div>
                  </td>
                  <td class="py-3 text-gray-500 hidden md:table-cell">{{ file.date }}</td>
                  <td class="py-3 text-gray-500 hidden md:table-cell">{{ file.size }}</td>
                  <td class="py-3 hidden md:table-cell">
                    <div class="flex -space-x-2">
                      @for (member of file.members; track member) {
                        <img [src]="member" class="w-6 h-6 rounded-full border-2 border-white" alt="Member">
                      }
                    </div>
                  </td>
                  <td class="py-3 text-right pr-2">
                    <button class="text-gray-400 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class DocumentsComponent {
  folders = [
    { name: 'Design Assets', items: 124, size: '2.4 GB' },
    { name: 'Marketing', items: 45, size: '850 MB' },
    { name: 'Financials', items: 12, size: '120 MB' },
    { name: 'Client Contracts', items: 8, size: '45 MB' }
  ];

  files = [
    { name: 'Project_Proposal_v2.pdf', type: 'pdf', date: 'Today, 10:24 AM', size: '2.4 MB', members: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2'] },
    { name: 'Homepage_Design.fig', type: 'fig', date: 'Yesterday, 4:30 PM', size: '145 MB', members: ['https://i.pravatar.cc/150?u=3'] },
    { name: 'Q3_Report.xlsx', type: 'xls', date: 'Sep 12, 2023', size: '450 KB', members: ['https://i.pravatar.cc/150?u=1'] },
    { name: 'Meeting_Notes.docx', type: 'doc', date: 'Sep 10, 2023', size: '24 KB', members: ['https://i.pravatar.cc/150?u=4', 'https://i.pravatar.cc/150?u=5'] },
    { name: 'Logo_Pack.zip', type: 'zip', date: 'Sep 08, 2023', size: '12 MB', members: ['https://i.pravatar.cc/150?u=2'] }
  ];

  getFileIconColor(type: string): string {
    const colors: Record<string, string> = {
      'pdf': 'bg-red-100 text-red-600',
      'fig': 'bg-purple-100 text-purple-600',
      'xls': 'bg-green-100 text-green-600',
      'doc': 'bg-blue-100 text-blue-600',
      'zip': 'bg-yellow-100 text-yellow-600'
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  }
}
