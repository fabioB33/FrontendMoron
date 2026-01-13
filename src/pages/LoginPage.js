import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PublicLayout } from '../components/PublicLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { LogIn } from 'lucide-react';
import { toast } from 'sonner';

export const LoginPage = () => {
  const [cuitCuil, setCuitCuil] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(cuitCuil, password);

    if (result.success) {
      toast.success('¡Bienvenido!');
      navigate('/dashboard');
    } else {
      toast.error(result.error);
    }

    setIsLoading(false);
  };

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Iniciar Sesión</h2>
              <p className="text-slate-600">Ingresá a tu cuenta de Argentina</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cuit-cuil">CUIT/CUIL</Label>
                <Input
                  id="cuit-cuil"
                  data-testid="login-cuit-cuil-input"
                  type="text"
                  placeholder="20123456789"
                  value={cuitCuil}
                  onChange={(e) => setCuitCuil(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  data-testid="login-password-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <Button
                data-testid="login-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-slate-900 hover:bg-slate-800"
              >
                {isLoading ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                ¿No tenés cuenta?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                  Registrate aquí
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs font-semibold text-amber-900 mb-2">🔑 Credenciales de Demo:
              </p>
              <div className="text-xs text-amber-800 space-y-1">
                <p><strong>Ciudadano:</strong> 20123456789 / demo123</p>
                <p><strong>Inspector:</strong> 20987654321 / demo123</p>
                <p><strong>Admin:</strong> 20555555555 / demo123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};