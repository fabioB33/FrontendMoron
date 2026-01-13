import React from 'react';
import { Link } from 'react-router-dom';

export const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">AR</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Argentina</h1>
                <p className="text-xs text-slate-600">Habilitaciones</p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                data-testid="header-login-btn"
                className="px-5 py-2.5 text-slate-700 hover:text-slate-900 font-medium rounded-lg hover:bg-slate-50 transition-all"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                data-testid="header-register-btn"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all shadow-sm hover:shadow-md"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AR</span>
                </div>
                <div>
                  <h3 className="font-bold">Argentina</h3>
                  <p className="text-sm text-slate-400">Sistema de Habilitaciones</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Plataforma digital para la gestión de habilitaciones comerciales con tecnología de inteligencia artificial.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Accesos</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/login" className="hover:text-white transition-colors">Iniciar Sesión</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Registrarse</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Buenos Aires</li>
                <li>habilitaciones@buenosaires.gov</li>
                <li>+54 11 0000-0000</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col items-center gap-3">
              <div className="text-center text-sm text-slate-400">
                © 2025 Argentina - Todos los derechos reservados
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Made by</span>
                <a 
                  href="https://pampalabs.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Pampa Labs
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};