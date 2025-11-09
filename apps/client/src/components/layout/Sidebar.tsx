import { NavLink, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useModel } from '@firsttx/local-first';
import { Home, Users, CheckSquare, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { UiPreferencesModel } from '@/models/ui-preferences';
import { useAuth } from '@/contexts/auth-context';
import { getInitials } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const menuItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/contacts', icon: Users, label: 'Contacts' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/interactions', icon: MessageSquare, label: 'Interactions' },
] as const;

export function Sidebar() {
  const navigate = useNavigate();
  const [preferences] = useModel(UiPreferencesModel);
  const { user, logout } = useAuth();
  const isExpanded = preferences?.sidebarExpanded ?? true;

  const toggleSidebar = () => {
    UiPreferencesModel.patch((draft) => {
      draft.sidebarExpanded = !draft.sidebarExpanded;
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <motion.aside
      animate={{ width: isExpanded ? 256 : 80 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative h-screen border-r border-border/40 bg-background/95 backdrop-blur-xl"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border/40 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent/50 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {getInitials(user?.name ?? null)}
                  </AvatarFallback>
                </Avatar>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-start"
                  >
                    <span className="text-sm font-medium">{user?.name ?? 'User'}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </motion.div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                }`
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border/40 p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="w-full justify-center"
          >
            {isExpanded ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </motion.aside>
  );
}
