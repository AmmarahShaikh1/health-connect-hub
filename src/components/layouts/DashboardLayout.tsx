import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Heart,
  Home,
  Calendar,
  FileText,
  Video,
  CreditCard,
  Settings,
  Users,
  ClipboardList,
  BarChart3,
  MessageSquare,
  Clock,
  LogOut,
  Menu,
  Bell,
  Stethoscope,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const menuItems = {
  patient: [
    { label: 'Dashboard', icon: Home, path: '/dashboard/patient' },
    { label: 'Book Appointment', icon: Calendar, path: '/dashboard/patient/book' },
    { label: 'My Appointments', icon: ClipboardList, path: '/dashboard/patient/appointments' },
    { label: 'Telemedicine', icon: Video, path: '/dashboard/patient/telemedicine' },
    { label: 'Medical Records', icon: FileText, path: '/dashboard/patient/records' },
    { label: 'Payments', icon: CreditCard, path: '/dashboard/patient/payments' },
    { label: 'Settings', icon: Settings, path: '/dashboard/patient/settings' },
  ],
  doctor: [
    { label: 'Dashboard', icon: Home, path: '/dashboard/doctor' },
    { label: 'Appointments', icon: Calendar, path: '/dashboard/doctor/appointments' },
    { label: 'Patient Requests', icon: ClipboardList, path: '/dashboard/doctor/requests' },
    { label: 'Telemedicine', icon: Video, path: '/dashboard/doctor/telemedicine' },
    { label: 'Prescriptions', icon: FileText, path: '/dashboard/doctor/prescriptions' },
    { label: 'Patient History', icon: Users, path: '/dashboard/doctor/patients' },
    { label: 'Messages', icon: MessageSquare, path: '/dashboard/doctor/messages' },
    { label: 'Availability', icon: Clock, path: '/dashboard/doctor/availability' },
  ],
  admin: [
    { label: 'Dashboard', icon: Home, path: '/dashboard/admin' },
    { label: 'Analytics', icon: BarChart3, path: '/dashboard/admin/analytics' },
    { label: 'Manage Doctors', icon: Stethoscope, path: '/dashboard/admin/doctors' },
    { label: 'Manage Patients', icon: Users, path: '/dashboard/admin/patients' },
    { label: 'Appointments', icon: Calendar, path: '/dashboard/admin/appointments' },
    { label: 'Approvals', icon: ClipboardList, path: '/dashboard/admin/approvals' },
    { label: 'Settings', icon: Settings, path: '/dashboard/admin/settings' },
  ],
};

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) {
    navigate('/login');
    return null;
  }

  const items = menuItems[user.role];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-16'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary shrink-0" />
            {sidebarOpen && <span className="font-bold text-lg">MediCare</span>}
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent text-muted-foreground hover:text-accent-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t">
          <div className={cn('flex items-center gap-3', !sidebarOpen && 'justify-center')}>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn('flex-1 flex flex-col transition-all duration-300', sidebarOpen ? 'ml-64' : 'ml-16')}>
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-card border-b sticky top-0 z-40">
          <h1 className="text-lg font-semibold capitalize">{user.role} Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/dashboard/${user.role}/settings`}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
