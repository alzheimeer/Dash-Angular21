import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthService, Platform, GameTitle, PlatformProfile, GameProfile, UserIntegration } from '../../../services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6 pb-10">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900">Settings</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Profile Settings -->
        <div class="glass-panel rounded-3xl p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Profile Information</h3>
          
          <form [formGroup]="profileForm" (ngSubmit)="onUpdateProfile()" class="space-y-4">
            <div class="flex items-center gap-4 mb-6">
              <img [src]="currentUser()?.avatar" alt="Avatar" class="w-16 h-16 rounded-full border-2 border-white shadow-md">
              <button type="button" class="text-sm font-medium text-black hover:underline">Change Avatar</button>
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1 ml-1">Full Name</label>
              <input type="text" formControlName="name" 
                     class="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 focus:bg-white focus:ring-2 focus:ring-black/5 focus:outline-none transition-all">
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1 ml-1">Email</label>
              <input type="email" formControlName="email" 
                     class="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 focus:bg-white focus:ring-2 focus:ring-black/5 focus:outline-none transition-all">
            </div>

            <div class="pt-2">
              <button type="submit" 
                      class="px-6 py-2 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 text-sm">
                Save Profile
              </button>
            </div>
          </form>
        </div>

        <!-- Security Settings -->
        <div class="glass-panel rounded-3xl p-6 h-fit">
          <h3 class="text-lg font-bold text-gray-900 mb-4">Security</h3>
          
          <form class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1 ml-1">Current Password</label>
              <input type="password" 
                     class="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 focus:bg-white focus:ring-2 focus:ring-black/5 focus:outline-none transition-all">
            </div>

            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1 ml-1">New Password</label>
              <input type="password" 
                     class="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/20 focus:bg-white focus:ring-2 focus:ring-black/5 focus:outline-none transition-all">
            </div>

            <div class="pt-2">
              <button type="button" 
                      class="px-6 py-2 bg-white text-gray-900 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Gaming Profiles -->
      <div class="glass-panel rounded-3xl p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold text-gray-900">Gaming Profiles</h3>
          <button type="button" (click)="saveGamingProfiles()"
                  class="px-6 py-2 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 text-sm">
            Save Gaming Profiles
          </button>
        </div>

        <form [formGroup]="gamingForm" class="space-y-8">
          <div formArrayName="profiles">
            @for (profile of profiles.controls; track $index) {
              <div [formGroupName]="$index" class="mb-8 last:mb-0">
                <!-- Platform Header -->
                <div class="flex items-center gap-4 mb-4">
                  <div class="relative flex items-center">
                    <input type="checkbox" formControlName="isActive" 
                           class="peer appearance-none w-12 h-7 bg-gray-200 rounded-full checked:bg-black transition-colors cursor-pointer">
                    <div class="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5 pointer-events-none"></div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-lg text-gray-900">{{ profile.get('platform')?.value }}</span>
                    <span class="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 font-medium" 
                          [class.bg-green-100]="profile.get('isActive')?.value" 
                          [class.text-green-700]="profile.get('isActive')?.value">
                      {{ profile.get('isActive')?.value ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                </div>

                <!-- Games List (Only if active) -->
                @if (profile.get('isActive')?.value) {
                  <div class="pl-4 border-l-2 border-gray-100 ml-6 space-y-4">
                    <div formArrayName="games" class="space-y-4">
                      @for (game of getGamesControls($index); track $index) {
                        <div [formGroupName]="$index" class="bg-white/40 p-4 rounded-2xl border border-white/50 relative group">
                          <button type="button" (click)="removeGame($index, $index)" 
                                  class="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>

                          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <!-- Game Title -->
                            <div>
                              <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Game</label>
                              <select formControlName="game" 
                                      class="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-black/5 focus:outline-none">
                                @for (title of availableGames; track title) {
                                  <option [value]="title">{{ title }}</option>
                                }
                              </select>
                            </div>

                            <!-- Nickname -->
                            <div>
                              <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Nickname</label>
                              <input type="text" formControlName="nickname" placeholder="e.g. PlayerOne"
                                     class="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-black/5 focus:outline-none">
                            </div>

                            <!-- Game ID -->
                            <div>
                              <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Game ID <span class="text-gray-300 font-normal">(Optional)</span></label>
                              <input type="text" formControlName="id" placeholder="e.g. 1234-ABCD"
                                     class="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-black/5 focus:outline-none">
                            </div>

                            <!-- Email -->
                            <div>
                              <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email <span class="text-gray-300 font-normal">(Optional)</span></label>
                              <input type="email" formControlName="email" placeholder="Used for this game"
                                     class="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-black/5 focus:outline-none">
                            </div>
                          </div>
                        </div>
                      }
                    </div>

                    <button type="button" (click)="addGame($index)" 
                            class="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-gray-600 transition-colors px-2 py-1">
                      <div class="w-5 h-5 rounded-full border border-dashed border-gray-900 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      </div>
                      Add Game to {{ profile.get('platform')?.value }}
                    </button>
                  </div>
                }
              </div>
            }
          </div>
        </form>
      </div>

      <!-- Integrations -->
      <div class="glass-panel rounded-3xl p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold text-gray-900">Integrations</h3>
          <button type="button" (click)="addPlugin()"
                  class="px-4 py-2 bg-white text-gray-900 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-sm flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
             Add new plugin
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (integration of integrations; track integration.id) {
            <div class="bg-white/40 p-5 rounded-2xl border border-white/50 flex items-start justify-between group hover:bg-white/60 transition-colors">
              <div class="flex gap-4">
                <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-gray-700"
                     [innerHTML]="integration.icon">
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">{{ integration.name }}</h4>
                  <p class="text-xs text-gray-500 mt-0.5">{{ integration.description }}</p>
                  <span class="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                        [class.bg-blue-100]="integration.type === 'app'" [class.text-blue-700]="integration.type === 'app'"
                        [class.bg-purple-100]="integration.type === 'plugin'" [class.text-purple-700]="integration.type === 'plugin'">
                    {{ integration.type }}
                  </span>
                </div>
              </div>

              <div class="relative flex items-center">
                <input type="checkbox" [checked]="integration.connected" (change)="toggleIntegration(integration.id)"
                       class="peer appearance-none w-10 h-6 bg-gray-200 rounded-full checked:bg-black transition-colors cursor-pointer">
                <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4 pointer-events-none"></div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class SettingsComponent {
  private fb = inject(FormBuilder);
  public authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  availablePlatforms: Platform[] = ['PS5', 'PC', 'Xbox', 'Switch'];
  availableGames: GameTitle[] = [
    'Tekken 8', 'FC 26', 'Battlefield', 'Call Of Duty', 
    'Street Fighter 6', '2XKO (Project L)', 
    'Fatal Fury: City of the Wolves', 'Mortal Kombat 1'
  ];

  integrations: UserIntegration[] = [];

  profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  gamingForm = this.fb.group({
    profiles: this.fb.array([])
  });

  get profiles() {
    return this.gamingForm.get('profiles') as FormArray;
  }

  constructor() {
    // Initialize form structure
    this.availablePlatforms.forEach(platform => {
      this.profiles.push(this.fb.group({
        platform: [platform],
        isActive: [false],
        games: this.fb.array([])
      }));
    });

    effect(() => {
      const user = this.currentUser();
      if (user) {
        // Update Profile Form
        this.profileForm.patchValue({
          name: user.name,
          email: user.email
        });

        // Update Gaming Form
        if (user.gamingProfiles) {
          user.gamingProfiles.forEach(userProfile => {
            const formProfile = this.profiles.controls.find(p => p.get('platform')?.value === userProfile.platform);
            if (formProfile) {
              formProfile.patchValue({ isActive: true });
              const gamesArray = formProfile.get('games') as FormArray;
              gamesArray.clear(); // Clear existing to avoid duplicates on re-render
              userProfile.games.forEach(game => {
                gamesArray.push(this.createGameGroup(game));
              });
            }
          });
        }

        // Update Integrations
        if (user.integrations) {
          this.integrations = [...user.integrations];
        }
      }
    });
  }

  createGameGroup(game?: GameProfile) {
    return this.fb.group({
      game: [game?.game || this.availableGames[0], Validators.required],
      nickname: [game?.nickname || '', Validators.required],
      id: [game?.id || ''],
      email: [game?.email || '']
    });
  }

  getGamesControls(profileIndex: number) {
    return (this.profiles.at(profileIndex).get('games') as FormArray).controls;
  }

  addGame(profileIndex: number) {
    const gamesArray = this.profiles.at(profileIndex).get('games') as FormArray;
    gamesArray.push(this.createGameGroup());
  }

  removeGame(profileIndex: number, gameIndex: number) {
    const gamesArray = this.profiles.at(profileIndex).get('games') as FormArray;
    gamesArray.removeAt(gameIndex);
  }

  onUpdateProfile() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value as any);
    }
  }

  saveGamingProfiles() {
    const formValue = this.gamingForm.value;
    const profiles = formValue.profiles || [];
    const activeProfiles: PlatformProfile[] = profiles
      .filter((p: any) => p && p.isActive)
      .map((p: any) => ({
        platform: p.platform,
        games: p.games
      }));

    this.authService.updateProfile({ gamingProfiles: activeProfiles });
  }

  toggleIntegration(id: string) {
    const updatedIntegrations = this.integrations.map(i => 
      i.id === id ? { ...i, connected: !i.connected } : i
    );
    this.authService.updateProfile({ integrations: updatedIntegrations });
  }

  addPlugin() {
    // Mock functionality
    alert('This would open a plugin marketplace!');
  }
}
