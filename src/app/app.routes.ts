import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './components/layout/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/pages/calendar/calendar.component';
import { MyTasksComponent } from './components/pages/tasks/my-tasks.component';
import { StatisticsComponent } from './components/pages/statistics/statistics.component';
import { DocumentsComponent } from './components/pages/documents/documents.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { SlackComponent } from './components/pages/integrations/slack/slack.component';
import { NotionComponent } from './components/pages/integrations/notion/notion.component';
import { TeamsComponent } from './components/pages/integrations/teams/teams.component';
import { SeoComponent } from './components/pages/integrations/seo/seo.component';
import { MarketingComponent } from './components/pages/integrations/marketing/marketing.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  // Dashboard Routes (Protected)
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'tasks', component: MyTasksComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'documents', component: DocumentsComponent },
      { path: 'settings', component: SettingsComponent },
      // Integrations
      { path: 'integration/slack', component: SlackComponent },
      { path: 'integration/notion', component: NotionComponent },
      { path: 'integration/teams', component: TeamsComponent },
      { path: 'integration/seo', component: SeoComponent },
      { path: 'integration/marketing', component: MarketingComponent },
    ]
  },
  
  // Auth Routes (Public/Guest)
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ]
  },

  // Fallback
  { path: '**', redirectTo: '' }
];
