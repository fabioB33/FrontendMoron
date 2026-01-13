import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ClipboardCheck, 
  Plus,
  TrendingUp,
  Users,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentAFAPs, setRecentAFAPs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      if (user?.role === 'ciudadano') {
        // Ciudadano: cargar sus solicitudes
        const response = await api.get('/afap');
        setRecentAFAPs(Array.isArray(response.data) ? response.data.slice(0, 5) : []);
      } else {
        // Inspector/Admin: cargar estadísticas
        const [statsRes, afapsRes] = await Promise.all([
          api.get('/stats/dashboard'),
          api.get('/afap')
        ]);
        setStats(statsRes.data || {});
        const recentData = statsRes.data?.recent_afaps || afapsRes.data || [];
        setRecentAFAPs(Array.isArray(recentData) ? recentData.slice(0, 5) : []);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Error al cargar los datos');
      setRecentAFAPs([]);
      setStats({});
    } finally {
      setLoading(false);
    }
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      pendiente: { 
        color: 'text-amber-700 bg-amber-50 border-amber-200', 
        icon: Clock,
        label: 'Pendiente' 
      },
      aprobado: { 
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200', 
        icon: CheckCircle,
        label: 'Aprobado' 
      },
      rechazado: { 
        color: 'text-red-700 bg-red-50 border-red-200', 
        icon: XCircle,
        label: 'Rechazado' 
      },
      inspeccion: { 
        color: 'text-blue-700 bg-blue-50 border-blue-200', 
        icon: ClipboardCheck,
        label: 'En Inspección' 
      },
    };
    
    const badge = badges[estado] || badges.pendiente;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div data-testid="dashboard-page" className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            ¡Bienvenido, {user?.nombre}!
          </h1>
          <p className="text-lg text-slate-600">
            {user?.role === 'ciudadano' && 'Administrá tus solicitudes de habilitación'}
            {user?.role === 'inspector' && 'Gestión de solicitudes e inspecciones'}
            {user?.role === 'administrador' && 'Panel de control y estadísticas'}
          </p>
        </div>

        {/* Stats Cards */}
        {user?.role !== 'ciudadano' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div
              data-testid="stat-card-total"
              className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-600">Total Habilitaciones Precarias</p>
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats.afaps.total}</p>
              <p className="text-xs text-slate-500 mt-1">Solicitudes totales</p>
            </div>

            <div
              data-testid="stat-card-pendientes"
              className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-600">Pendientes</p>
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats.afaps.pendientes}</p>
              <p className="text-xs text-slate-500 mt-1">Requieren revisión</p>
            </div>

            <div
              data-testid="stat-card-aprobados"
              className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-600">Aprobados</p>
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats.afaps.aprobados}</p>
              <p className="text-xs text-slate-500 mt-1">Habilitaciones otorgadas</p>
            </div>

            <div
              data-testid="stat-card-inspecciones"
              className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-slate-600">Inspecciones</p>
                <ClipboardCheck className="w-5 h-5 text-violet-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900">
                {stats.inspecciones.programadas}
              </p>
              <p className="text-xs text-slate-500 mt-1">Programadas</p>
            </div>
          </div>
        )}

        {/* Ciudadano CTA */}
        {user?.role === 'ciudadano' && (
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">¿Necesitás una nueva habilitación?</h2>
                <p className="text-blue-100 mb-4">
                  Iniciá tu solicitud Habilitación Precaria y obtené tu autorización en menos de 24 horas
                </p>
                <Link to="/nueva-solicitud">
                  <Button
                    data-testid="nueva-solicitud-btn"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Nueva Solicitud Habilitación Precaria
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                <FileText className="w-32 h-32 text-white/20" />
              </div>
            </div>
          </div>
        )}

        {/* Recent Habilitaciones Precarias Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                {user?.role === 'ciudadano' ? 'Mis Solicitudes' : 'Solicitudes Recientes'}
              </h2>
              <Link
                to={user?.role === 'ciudadano' ? '/mis-solicitudes' : '/solicitudes'}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver todas →
              </Link>
            </div>
          </div>

          {recentAFAPs.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 mb-4">No hay solicitudes aún</p>
              {user?.role === 'ciudadano' && (
                <Link to="/nueva-solicitud">
                  <Button data-testid="empty-state-create-btn">
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Primera Solicitud
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      N° Habilitación Precaria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Solicitante
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Domicilio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {recentAFAPs.map((afap) => (
                    <tr
                      key={afap.id}
                      data-testid={`habilitacion_precaria-row-${afap.numero_afap}`}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-slate-900">
                          #{afap?.numero_afap || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {afap.solicitante_nombre} {afap.solicitante_apellido}
                          </p>
                          <p className="text-xs text-slate-500">{afap.solicitante_cuit_cuil}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-900">
                          {afap.domicilio_calle} {afap.domicilio_altura}
                        </p>
                        <p className="text-xs text-slate-500">{afap.domicilio_localidad}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getEstadoBadge(afap.estado)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {new Date(afap.fecha_solicitud).toLocaleDateString('es-AR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
