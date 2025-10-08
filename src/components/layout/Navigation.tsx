// Healthcare Navigation Component for MagicMeds
// Responsive navigation with healthcare-specific icons and accessibility features

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Heart,
  MessageSquare,
  BookOpen,
  User,
  Calendar,
  Stethoscope,
  Phone,
  Shield,
  Menu,
  X,
  Home,
  Activity,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  badge?: number;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
    requiresAuth: false,
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: Activity,
    requiresAuth: true,
  },
  {
    href: '/consultation',
    label: 'Consultation',
    icon: Stethoscope,
    requiresAuth: true,
    children: [
      {
        href: '/consultation/ai',
        label: 'AI Assistant',
        icon: MessageSquare,
        requiresAuth: true,
      },
      {
        href: '/consultation/voice',
        label: 'Voice Chat',
        icon: Phone,
        requiresAuth: true,
      },
      {
        href: '/consultation/video',
        label: 'Video Call',
        icon: Calendar,
        requiresAuth: true,
      },
    ],
  },
  {
    href: '/health',
    label: 'Health Records',
    icon: Heart,
    requiresAuth: true,
    children: [
      {
        href: '/health/vitals',
        label: 'Vital Signs',
        icon: Activity,
        requiresAuth: true,
      },
      {
        href: '/health/symptoms',
        label: 'Symptoms',
        icon: MessageSquare,
        requiresAuth: true,
      },
      {
        href: '/health/medications',
        label: 'Medications',
        icon: Shield,
        requiresAuth: true,
      },
    ],
  },
  {
    href: '/education',
    label: 'Health Education',
    icon: BookOpen,
    requiresAuth: false,
  },
  {
    href: '/appointments',
    label: 'Appointments',
    icon: Calendar,
    requiresAuth: true,
    badge: 2, // Example badge for upcoming appointments
  },
  {
    href: '/emergency',
    label: 'Emergency',
    icon: Phone,
    requiresAuth: false,
  },
];

const userMenuItems: NavigationItem[] = [
  {
    href: '/profile',
    label: 'Profile',
    icon: User,
  },
  {
    href: '/notifications',
    label: 'Notifications',
    icon: Bell,
    badge: 3,
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
  },
  {
    href: '/help',
    label: 'Help & Support',
    icon: HelpCircle,
  },
];

interface HealthBridgeNavigationProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onSignOut?: () => void;
}

const HealthBridgeNavigation: React.FC<HealthBridgeNavigationProps> = ({
  user,
  onSignOut,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleExpanded = (href: string) => {
    setExpandedItems(prev =>
      prev.includes(href)
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const NavItem: React.FC<{
    item: NavigationItem;
    isChild?: boolean;
    onClick?: () => void;
  }> = ({ item, isChild = false, onClick }) => {
    const Icon = item.icon;
    const isActive = isActiveRoute(item.href);
    const isExpanded = expandedItems.includes(item.href);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div className="relative">
        <Link
          href={item.href}
          className={cn(
            'flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
            'hover:bg-primary-50 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            isChild && 'ml-6 pl-8',
            isActive
              ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
              : 'text-neutral-600 hover:text-neutral-900',
            item.href === '/emergency' && 'text-error-600 bg-error-50 hover:bg-error-100'
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.href);
            }
            onClick?.();
          }}
          aria-current={isActive ? 'page' : undefined}
        >
          <div className="flex items-center space-x-3">
            <Icon
              className={cn(
                'h-5 w-5',
                isActive ? 'text-primary-600' : 'text-neutral-500',
                item.href === '/emergency' && 'text-error-600'
              )}
              aria-hidden="true"
            />
            <span>{item.label}</span>
            {item.badge && (
              <span
                className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-error-600 rounded-full"
                aria-label={`${item.badge} notifications`}
              >
                {item.badge}
              </span>
            )}
          </div>
          {hasChildren && (
            <svg
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                isExpanded ? 'rotate-90' : 'rotate-0'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </Link>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => (
              <NavItem
                key={child.href}
                item={child}
                isChild={true}
                onClick={onClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg bg-white shadow-lg border border-neutral-200 text-neutral-600 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-neutral-900/50 backdrop-blur-sm"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full w-64 bg-white border-r border-neutral-200 transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">MagicMeds</h1>
              <p className="text-xs text-neutral-500">Healthcare Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              // Skip auth-required items if user is not logged in
              if (item.requiresAuth && !user) {
                return null;
              }

              return (
                <NavItem
                  key={item.href}
                  item={item}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              );
            })}
          </nav>

          {/* User menu */}
          {user && (
            <div className="border-t border-neutral-200 p-4">
              {/* User info */}
              <div className="flex items-center space-x-3 px-3 py-2 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-primary-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* User menu items */}
              <div className="space-y-1">
                {userMenuItems.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}

                {/* Sign out button */}
                <button
                  onClick={onSignOut}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-sm font-medium text-error-600 rounded-lg hover:bg-error-50 focus:outline-none focus:ring-2 focus:ring-error-500/20 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" aria-hidden="true" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}

          {/* Auth buttons for non-logged in users */}
          {!user && (
            <div className="border-t border-neutral-200 p-4 space-y-2">
              <Link
                href="/auth/signin"
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Emergency contact info */}
          <div className="border-t border-neutral-200 p-4">
            <div className="text-center">
              <p className="text-xs text-neutral-500 mb-1">Emergency Hotline</p>
              <a
                href="tel:108"
                className="text-sm font-bold text-error-600 hover:text-error-700"
              >
                📞 108
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Top header for mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-16">
        <div className="flex items-center space-x-3">
          <Heart className="h-6 w-6 text-primary-600" />
          <span className="text-lg font-bold text-neutral-900">MagicMeds</span>
        </div>
        {user && (
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-neutral-600" />
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-600" />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default HealthBridgeNavigation;