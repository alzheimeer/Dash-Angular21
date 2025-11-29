import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export type Platform = 'PS5' | 'PC' | 'Xbox' | 'Switch';
export type GameTitle = 'Tekken 8' | 'FC 26' | 'Battlefield' | 'Call Of Duty' | 'Street Fighter 6' | '2XKO (Project L)' | 'Fatal Fury: City of the Wolves' | 'Mortal Kombat 1';

export interface GameProfile {
  game: GameTitle;
  nickname: string;
  email?: string;
  id?: string;
}

export interface PlatformProfile {
  platform: Platform;
  games: GameProfile[];
}

export interface UserIntegration {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  type: 'app' | 'plugin';
  description?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  gamingProfiles?: PlatformProfile[];
  integrations?: UserIntegration[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal to hold the current user state
  private _currentUser = signal<User | null>(this.loadUserFromStorage());

  // Computed signal to check if user is authenticated
  isAuthenticated = computed(() => !!this._currentUser());
  currentUser = this._currentUser.asReadonly();

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    // Mock login logic
    if (email && password) {
      const user: User = {
        id: 1,
        name: 'Dilan',
        email: email,
        avatar: 'https://i.pravatar.cc/150?u=dilan',
        gamingProfiles: [
          {
            platform: 'PC',
            games: [
              { game: 'Battlefield', nickname: 'batlepepe' },
              { game: 'Tekken 8', nickname: 'Alzheimeer', id: '349Q-tay4-YYH8' }
            ]
          },
          {
            platform: 'PS5',
            games: [
              { game: 'Tekken 8', nickname: 'ailzheimeer', id: '987F-txy5-PPS9' }
            ]
          },
          {
            platform: 'Xbox',
            games: [
              { game: 'FC 26', nickname: 'alzheimeer' }
            ]
          }
        ],
        integrations: [
          { 
            id: 'slack', 
            name: 'Slack', 
            icon: '<path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>', 
            connected: true, 
            type: 'app',
            description: 'Connect with your team'
          },
          { 
            id: 'notion', 
            name: 'Notion', 
            icon: '<path d="M4 4v16h16V4H4zm2 2h12v12H6V6zm2 2v8h2V8H8zm4 0v8h2V8h-2zm4 0v8h2V8h-2z"/>', // Placeholder icon
            connected: false, 
            type: 'app',
            description: 'Sync your notes'
          },
          { 
            id: 'teams', 
            name: 'Microsoft Teams', 
            icon: '<path d="M2 10h20v4H2z"/>', // Placeholder icon
            connected: false, 
            type: 'app',
            description: 'Collaboration hub'
          },
          { 
            id: 'seo', 
            name: 'SEO Tools', 
            icon: '<path d="M2 12h20M2 12l5-5m-5 5l5 5"/>', // Placeholder icon
            connected: true, 
            type: 'plugin',
            description: 'Optimize your content'
          },
          { 
            id: 'marketing', 
            name: 'Marketing Pack', 
            icon: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>', // Placeholder icon
            connected: false, 
            type: 'plugin',
            description: 'Boost your reach'
          }
        ]
      };
      this._currentUser.set(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }

  loginWithProvider(provider: 'google' | 'github'): void {
    // Mock provider login
    const user: User = {
      id: 2,
      name: `User ${provider}`,
      email: `user@${provider}.com`,
      avatar: `https://i.pravatar.cc/150?u=${provider}`,
      gamingProfiles: [],
      integrations: []
    };
    this._currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/']);
  }

  register(name: string, email: string, password: string): boolean {
    // Mock register logic
    if (name && email && password) {
      const user: User = {
        id: Math.floor(Math.random() * 1000),
        name: name,
        email: email,
        avatar: `https://i.pravatar.cc/150?u=${name}`,
        gamingProfiles: [],
        integrations: []
      };
      this._currentUser.set(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  recoverPassword(email: string): boolean {
    // Mock recovery logic
    console.log(`Password recovery email sent to ${email}`);
    return true;
  }

  updateProfile(data: Partial<User>): void {
    const current = this._currentUser();
    if (current) {
      const updated = { ...current, ...data };
      this._currentUser.set(updated);
      localStorage.setItem('user', JSON.stringify(updated));
    }
  }

  private loadUserFromStorage(): User | null {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('user');
      if (stored) {
        const user = JSON.parse(stored);
        // Ensure integrations exist even if loading old data
        if (!user.integrations) {
          user.integrations = [
            { 
              id: 'slack', 
              name: 'Slack', 
              icon: '<path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>', 
              connected: true, 
              type: 'app',
              description: 'Connect with your team'
            },
            { 
              id: 'notion', 
              name: 'Notion', 
              icon: '<path d="M4 4v16h16V4H4zm2 2h12v12H6V6zm2 2v8h2V8H8zm4 0v8h2V8h-2zm4 0v8h2V8h-2z"/>', 
              connected: false, 
              type: 'app',
              description: 'Sync your notes'
            },
            { 
              id: 'teams', 
              name: 'Microsoft Teams', 
              icon: '<path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM9 16.5h-2v-3h2v3zm2.5 0h-2v-5h2v5zm2.5 0h-2v-4h2v4zm2.5 0h-2v-6h2v6z" fill="currentColor"/>', 
              connected: false, 
              type: 'app',
              description: 'Collaboration hub'
            },
            { 
              id: 'seo', 
              name: 'SEO Tools', 
              icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>', 
              connected: true, 
              type: 'plugin',
              description: 'Optimize your content'
            },
            { 
              id: 'marketing', 
              name: 'Marketing Pack', 
              icon: '<path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" fill="currentColor"/>', 
              connected: false, 
              type: 'plugin',
              description: 'Boost your reach'
            }
          ];
        }
        return user;
      }
    }
    return null;
  }
}
