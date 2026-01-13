import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Home, FileText, BarChart3, ClipboardCheck, User } from 'lucide-react';
import { Button } from './ui/button';
import { AIAssistant } from './AIAssistant';
import { AIAssistantTrigger } from './AIAssistantTrigger';

export const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: Home, label: 'Inicio', path: '/dashboard', roles: ['ciudadano', 'inspector', 'administrador'] },
    { icon: FileText, label: 'Mis Solicitudes', path: '/mis-solicitudes', roles: ['ciudadano'] },
    { icon: FileText, label: 'Solicitudes', path: '/solicitudes', roles: ['inspector', 'administrador'] },
    { icon: ClipboardCheck, label: 'Inspecciones', path: '/inspecciones', roles: ['inspector', 'administrador'] },
    { icon: BarChart3, label: 'Estadísticas', path: '/estadisticas', roles: ['administrador'] },
  ];

  const visibleMenuItems = menuItems.filter((item) => item.roles.includes(user?.role));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AR</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Argentina</h1>
                <p className="text-xs text-slate-600">Habilitaciones</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">
                  {user?.nombre} {user?.apellido}
                </p>
                <p className="text-xs text-slate-600 capitalize">{user?.role}</p>
              </div>
              <Button
                data-testid="logout-btn"
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-1">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = window.location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  data-testid={`menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
      <AIAssistantTrigger />
    </div>
  );
};