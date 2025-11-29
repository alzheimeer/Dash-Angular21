# iDraft - Modern Angular Dashboard Template

A premium, modern dashboard template built with Angular 21 and Tailwind CSS 4, featuring glassmorphism design, comprehensive authentication system, and dynamic integrations.

## 🚀 Technologies Used

### Core Framework

- **Angular 21** - Latest version with standalone components, signals, and control flow
- **TypeScript 5.7+** - Strict type checking enabled
- **RxJS** - Reactive programming for async operations

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework with modern syntax
- **Glassmorphism Design** - Premium frosted glass aesthetic
- **Responsive Layout** - Mobile-first approach

### State Management

- **Angular Signals** - Built-in reactive state management
- **Computed Values** - Derived state with automatic dependency tracking
- **Effects** - Side effect management

### Routing & Guards

- **Angular Router** - Client-side routing with lazy loading
- **Functional Guards** - `authGuard` and `guestGuard` for route protection

### Forms

- **Reactive Forms** - Type-safe form handling with `FormBuilder`
- **Dynamic Form Arrays** - Complex nested forms for gaming profiles

## ✨ Features

### Authentication System

- Login with email/password
- OAuth2 mock integration (Google, GitHub)
- User registration
- Password recovery
- Protected routes with guards
- Persistent sessions via localStorage

### User Management

- Profile settings (name, email, avatar)
- Password management
- Gaming profiles across platforms (PS5, PC, Xbox, Switch)
- Multiple game accounts per platform

### Dynamic Integrations

- **Apps**: Slack, Notion, Microsoft Teams
- **Plugins**: SEO Tools, Marketing Pack
- Dynamic sidebar based on active integrations
- Dedicated pages for each integration
- Toggle integrations on/off

### Dashboard Pages

- **Overview**: Statistics, charts, goals, and tasks
- **Calendar**: Monthly view with events
- **My Tasks**: Task management with filters
- **Statistics**: KPIs and analytics
- **Documents**: File explorer interface
- **Settings**: Comprehensive user configuration

## 📦 Installation

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dashboard-v21
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm start
   ```

   Navigate to `http://localhost:4200/`

4. **Build for production**
   ```bash
   npm run build
   ```
   Production files will be in the `dist/` directory.

## 🛠️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── auth/              # Login, Register, Forgot Password
│   │   ├── dashboard/         # Dashboard widgets
│   │   ├── layout/            # Sidebar, Header, Layouts
│   │   └── pages/             # Feature pages
│   │       ├── calendar/
│   │       ├── tasks/
│   │       ├── statistics/
│   │       ├── documents/
│   │       ├── settings/
│   │       └── integrations/  # Slack, Notion, Teams, SEO, Marketing
│   ├── guards/                # Route guards
│   ├── services/              # AuthService
│   └── app.routes.ts          # Route configuration
└── styles.css                 # Global styles & Tailwind config
```

## 🎨 Design System

### Color Palette

- **Primary**: Black (#000000)
- **Backgrounds**: White with transparency layers
- **Accents**: Blue, Purple, Green, Orange
- **Text**: Gray scale (900, 700, 500, 400)

### Components

- Glass panels with backdrop blur
- Rounded corners (xl, 2xl, 3xl)
- Smooth transitions and hover effects
- Shadow layers for depth

## 🔐 Authentication Flow

1. **Unauthenticated users** are redirected to `/login`
2. **Login** creates a session and stores user in localStorage
3. **Authenticated users** access dashboard routes
4. **Logout** clears session and redirects to login

### Mock Credentials

```
Email: any@email.com
Password: any password
```

## 📝 Development Guidelines

### Angular Best Practices

- Standalone components (no NgModules)
- Signals for state management
- Control flow syntax (`@if`, `@for`, `@switch`)
- `inject()` function instead of constructor injection
- OnPush change detection strategy

### Code Style

- Strict TypeScript
- Reactive forms over template-driven
- Class bindings over `ngClass`
- Style bindings over `ngStyle`

## 📄 License

**⚠️ COMMERCIAL LICENSE - PAID TEMPLATE**

This is a **premium commercial template**. Unauthorized use, distribution, or modification is strictly prohibited.

### License Terms

- ✅ Single project use per license
- ✅ Modify for your own project
- ❌ Resell or redistribute
- ❌ Use in open-source projects
- ❌ Share with third parties

**To purchase a license, contact:** [Your contact information]

---

## 🤝 Support

For support, feature requests, or bug reports:

- Email: niklaussmauricio@gmail.com

## 🔄 Version

**Current Version**: 1.0.0  
**Angular Version**: 21.x  
**Last Updated**: November 2025

---

**Built with ❤️ using Angular 21 and Tailwind CSS 4**
