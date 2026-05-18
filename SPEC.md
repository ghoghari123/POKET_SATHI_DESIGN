# Pocketsathi Admin Panel Specification

## Project Overview
- **Project Name**: Pocketsathi Admin Panel
- **Type**: Web Application (Admin Dashboard)
- **Core Functionality**: A comprehensive admin panel for managing users, orders, analytics, and system settings with a premium, corporate design
- **Target Users**: System administrators, managers, and support staff

## Technology Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4.x
- **Routing**: React Router DOM 7
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Utilities**: clsx, tailwind-merge

---

## UI/UX Specification

### Color Palette

#### Light Theme
- **Background Primary**: `#F8FAFC` (slate-50)
- **Background Secondary**: `#FFFFFF` (white)
- **Background Card**: `#FFFFFF`
- **Text Primary**: `#0F172A` (slate-900)
- **Text Secondary**: `#64748B` (slate-500)
- **Text Muted**: `#94A3B8` (slate-400)
- **Border**: `#E2E8F0` (slate-200)
- **Border Hover**: `#CBD5E1` (slate-300)

#### Dark Theme
- **Background Primary**: `#0F172A` (slate-900)
- **Background Secondary**: `#1E293B` (slate-800)
- **Background Card**: `#1E293B`
- **Text Primary**: `#F8FAFC` (slate-50)
- **Text Secondary**: `#94A3B8` (slate-400)
- **Text Muted**: `#64748B` (slate-500)
- **Border**: `#334155` (slate-700)
- **Border Hover**: `#475569` (slate-600)

#### Accent Colors
- **Primary**: `#6366F1` (indigo-500)
- **Primary Hover**: `#4F46E5` (indigo-600)
- **Success**: `#10B981` (emerald-500)
- **Warning**: `#F59E0B` (amber-500)
- **Error**: `#EF4444` (red-500)
- **Info**: `#3B82F6` (blue-500)

#### Chart Colors
- **Primary Chart**: `#6366F1` (indigo-500)
- **Secondary Chart**: `#8B5CF6` (violet-500)
- **Success Chart**: `#10B981` (emerald-500)
- **Warning Chart**: `#F59E0B` (amber-500)
- **Danger Chart**: `#EF4444` (red-500)

### Typography
- **Font Family**: `"Plus Jakarta Sans", "Inter", system-ui, sans-serif`
- **Headings**:
  - H1: 32px, font-weight 700
  - H2: 24px, font-weight 600
  - H3: 20px, font-weight 600
  - H4: 16px, font-weight 600
- **Body**: 14px, font-weight 400
- **Small**: 12px, font-weight 400
- **Caption**: 11px, font-weight 500

### Spacing System
- **Base Unit**: 4px
- **Spacing Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- **Card Padding**: 24px
- **Card Border Radius**: 16px
- **Button Border Radius**: 8px
- **Input Border Radius**: 8px

### Layout Structure

#### Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)
- **Large Desktop**: > 1280px (xl)

#### Admin Layout
- **Sidebar Width**: 280px (desktop), collapsible on mobile
- **Header Height**: 64px
- **Content Padding**: 24px (desktop), 16px (mobile)
- **Max Content Width**: 1440px

---

## Pages & Components

### 1. Login Page (`/admin/login`)

#### Layout
- Centered card on gradient background
- Logo at top
- Form centered vertically and horizontally
- Subtle background pattern

#### Components
- **Logo**: Pocketsathi logo with "Admin" badge
- **Login Form Card**:
  - Title: "Welcome back" with subtitle
  - Username input field
  - Password input field with show/hide toggle
  - "Remember me" checkbox
  - "Forgot password?" link
  - Login button (full width, primary color)
  - Error message display area
- **Background**: Subtle gradient with floating shapes

#### States
- Default, Loading (spinner), Error (shake animation)

### 2. Dashboard (`/admin/dashboard`)

#### Layout
- Header with page title, theme toggle, notifications, profile
- Stats cards row (5 cards)
- Charts section (2x2 grid)
- Recent activity section
- Notifications panel

#### Stats Cards (5 cards)
1. **Total Users** - Icon: Users, Color: Primary
2. **Total Orders** - Icon: ShoppingCart, Color: Success
3. **Revenue** - Icon: DollarSign, Color: Warning
4. **Active Sessions** - Icon: Activity, Color: Info
5. **Pending Approvals** - Icon: Clock, Color: Error

Each card shows:
- Icon with colored background circle
- Label (muted text)
- Value (large, bold)
- Percentage change indicator (green up / red down arrow)

#### Charts Section (2x2 Grid)
1. **Line Chart - Monthly Growth**
   - X-axis: Last 12 months
   - Y-axis: User count
   - Smooth curved line with gradient fill

2. **Bar Chart - Weekly Activity**
   - X-axis: Days of week
   - Y-axis: Activity count
   - Grouped bars for different metrics

3. **Pie Chart - Category Distribution**
   - 4-5 segments with labels
   - Legend on right side
   - Hover effects

4. **Area Chart - Revenue Trends**
   - Stacked area chart
   - Multiple revenue streams
   - Smooth transitions

#### Recent Activity Section
- Timeline list with icons
- Activity description, timestamp, user info
- Max 10 items visible
- "View all" link

#### Notifications Panel
- Card with header
- List of alerts (5 items)
- Each alert: icon, message, time, dismiss button
- Different colors based on type (info, success, warning, error)

### 3. User Management (`/admin/users`)

#### Layout
- Header with title and "Add User" button
- Search bar and filters row
- Data table with pagination
- Action buttons per row

#### Table Columns
- Avatar + Name
- Email
- Role (dropdown)
- Status (badge)
- Created Date
- Actions (Edit, Delete, View)

#### Features
- Search by name/email
- Filter by status (All, Active, Inactive, Pending)
- Filter by role
- Sort by any column
- Pagination (10, 25, 50 per page)
- Bulk actions (Select all, Delete selected, Export)

#### Status Badges
- **Active**: Green background, "Active" text
- **Inactive**: Gray background, "Inactive" text
- **Pending**: Yellow background, "Pending" text
- **Suspended**: Red background, "Suspended" text

### 4. Orders Management (`/admin/orders`)

#### Layout
- Header with title and filters
- Search and filter bar
- Kanban or Table view toggle
- Orders table/grid

#### Table Columns
- Order ID
- Customer Name
- Service Type
- Amount
- Status
- Date
- Actions

#### Status Badges
- **Pending**: Yellow
- **Processing**: Blue
- **Completed**: Green
- **Cancelled**: Red
- **Refunded**: Purple

### 5. Analytics (`/admin/analytics`)

#### Layout
- Header with date range picker
- Filter options (date, category, region)
- Summary stats row
- Charts and graphs
- Data tables

#### Filters
- Date Range Picker (preset: Today, Last 7 days, Last 30 days, Last 90 days, Custom)
- Category dropdown
- Region dropdown

#### Charts
- Revenue over time (Line)
- User acquisition (Bar)
- Conversion funnel (Funnel chart)
- Geographic distribution (Map placeholder)

### 6. Settings (`/admin/settings`)

#### Layout
- Tab navigation (General, Security, Notifications, Appearance)
- Form sections for each tab

#### Tabs Content
- **General**: Site name, logo, timezone, language
- **Security**: Password requirements, session timeout, 2FA
- **Notifications**: Email notifications, push notifications, alerts
- **Appearance**: Theme mode, accent color, font size

---

## Component Library

### Common Components

#### Button
- Variants: Primary, Secondary, Outline, Ghost, Danger
- Sizes: sm (32px), md (40px), lg (48px)
- States: Default, Hover, Active, Disabled, Loading

#### Input
- Types: Text, Email, Password, Number, Search
- States: Default, Focus, Error, Disabled
- With icons support

#### Select/Dropdown
- Single select with search
- Multi-select option
- Custom option rendering

#### Card
- Default with shadow
- Flat (no shadow)
- Interactive (hover effects)

#### Modal
- Centered overlay
- Sizes: sm (400px), md (600px), lg (800px), full
- Close button, title, actions

#### Table
- Striped rows
- Hover effect
- Sortable columns
- Pagination
- Empty state

#### Badge
- Colors: primary, success, warning, error, info
- Sizes: sm, md

#### Avatar
- Sizes: xs (24px), sm (32px), md (40px), lg (56px), xl (80px)
- With fallback initials
- With status indicator

#### Toast/Alert
- Types: Info, Success, Warning, Error
- With icon and dismiss
- Auto-dismiss option

#### Skeleton/Loader
- Card skeleton
- Table row skeleton
- Chart skeleton

---

## Functionality Specification

### Authentication
- Login with username/password
- Session management (localStorage)
- Logout functionality
- Protected routes (redirect to login if not authenticated)

### Theme Toggle
- Light/Dark mode switch
- Persist preference in localStorage
- Smooth transition between themes

### Data Management
- Mock data for demo purposes
- Local state management with React hooks
- Simulated API calls with loading states

### Search & Filter
- Real-time search
- Multi-criteria filtering
- Clear filters option

### Pagination
- Page size selector
- Page navigation
- Total count display

---

## Animations & Interactions

### Page Transitions
- Fade in on route change
- Slide in for sidebar (mobile)

### Micro-interactions
- Button hover scale (1.02)
- Card hover lift (translateY -2px, shadow increase)
- Input focus ring
- Checkbox/radio transitions

### Loading States
- Skeleton pulse animation
- Spinner rotation
- Progress bar (where applicable)

### Charts
- Animate on mount
- Hover tooltips
- Legend toggle

### Theme Transition
- 200ms ease for all color changes

---

## File Structure

```
src/
├── admin/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── charts/
│   │   │   ├── LineChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   ├── AreaChart.tsx
│   │   │   └── ChartCard.tsx
│   │   └── features/
│   │       ├── StatsCard.tsx
│   │       ├── ActivityItem.tsx
│   │       ├── NotificationItem.tsx
│   │       ├── SearchBar.tsx
│   │       ├── FilterDropdown.tsx
│   │       └── Pagination.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Users.tsx
│   │   ├── Orders.tsx
│   │   ├── Analytics.tsx
│   │   └── Settings.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTheme.ts
│   │   └── usePagination.ts
│   ├── data/
│   │   └── mockData.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       └── helpers.ts
├── App.tsx (updated to include admin routes)
└── main.tsx
```

---

## Acceptance Criteria

### Login Page
- [ ] Clean, centered login form with professional design
- [ ] Username and password fields work correctly
- [ ] Show/hide password toggle functions
- [ ] Error messages display properly
- [ ] Loading state shows during authentication attempt

### Dashboard
- [ ] All 5 stat cards display with correct data
- [ ] Charts render correctly (Line, Bar, Pie, Area)
- [ ] Recent activity shows latest 10 items
- [ ] Notifications panel shows alerts
- [ ] Responsive layout works on mobile/tablet/desktop

### Navigation
- [ ] Sidebar highlights active page
- [ ] All navigation links work
- [ ] Mobile menu opens/closes correctly
- [ ] Theme toggle switches between light/dark

### User Management
- [ ] Table displays all users with correct columns
- [ ] Search filters users in real-time
- [ ] Status filter works correctly
- [ ] Pagination works (page size, navigation)
- [ ] Action buttons (Edit, Delete) are functional

### Orders Management
- [ ] Orders display in table format
- [ ] Status badges show correct colors
- [ ] Filters work correctly

### Analytics
- [ ] Date range picker works
- [ ] Charts update based on filters

### Settings
- [ ] Tab navigation works
- [ ] Form inputs are functional

### General
- [ ] Dark/Light theme works throughout
- [ ] Loading states display during data fetch
- [ ] Empty states show when no data
- [ ] Error states handle gracefully
- [ ] All animations are smooth
- [ ] Responsive on all screen sizes

---

## Design Notes

- Use Plus Jakarta Sans font from Google Fonts
- Maintain consistent 8px grid system
- Use subtle shadows (0 4px 6px -1px rgba(0, 0, 0, 0.1))
- Keep border-radius consistent (8px for buttons, 12px for cards)
- Use transitions for all interactive elements (150-200ms)
- Ensure sufficient color contrast for accessibility
- Mobile-first approach for responsive design