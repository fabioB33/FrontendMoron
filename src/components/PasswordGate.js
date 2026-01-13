import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const PasswordGate = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Contraseña configurada - CAMBIAR EN PRODUCCIÓN
  const SITE_PASSWORD = 'argentina2025';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular verificación
    setTimeout(() => {
      if (password === SITE_PASSWORD) {
        // Guardar en localStorage que ya pasó la verificación
        localStorage.setItem('site_access', 'granted');
        onSuccess();
      } else {
        setError('Contraseña incorrecta. Intentá de nuevo.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
        
        <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-8 text-center">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-xl mb-4">
              <span className="text-4xl font-bold text-blue-600">AR</span>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              Argentina Habilitaciones
            </h1>
            <p className="text-blue-100 text-sm">
              Sistema de Gestión Digital
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Acceso Protegido
              </h2>
              <p className="text-sm text-slate-600">
                Ingresá la contraseña para acceder al sistema
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password Input */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ingresá la contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-12 text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!password || isLoading}
                className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verificando...
                  </div>
                ) : (
                  'Ingresar'
                )}
              </Button>
            </form>

            {/* Footer Note */}
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-xs text-slate-600 text-center">
                <Lock className="w-3 h-3 inline mr-1" />
                Este sitio está protegido. Solo personal autorizado puede acceder.
              </p>
            </div>
          </div>

          {/* Bottom branding */}
          <div className="px-8 pb-6 text-center">
            <p className="text-xs text-slate-500">
              Desarrollado por <span className="font-semibold text-blue-600">Pampa Labs</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
