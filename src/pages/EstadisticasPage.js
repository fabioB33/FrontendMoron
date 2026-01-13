import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import api from '../utils/api';
import { FileText, Clock, CheckCircle, XCircle, ClipboardCheck, TrendingUp, Users } from 'lucide-react';
import { toast } from 'sonner';

export const EstadisticasPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.get('/stats/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
      toast.error('Error al cargar las estadísticas');
    } finally {
      setLoading(false);
    }
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

  if (!stats) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-slate-600">No se pudieron cargar las estadísticas</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div data-testid="estadisticas-page" className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Estadísticas</h1>
          <p className="text-slate-600">Panel de control y métricas del sistema</p>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Total Habilitaciones Precarias</p>
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-4xl font-bold text-slate-900 mb-1">{stats.afaps.total}</p>
            <p className="text-xs text-slate-500">Solicitudes totales</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Pendientes</p>
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-4xl font-bold text-slate-900 mb-1">{stats.afaps.pendientes}</p>
            <p className="text-xs text-slate-500">Requieren revisión</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Aprobados</p>
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-4xl font-bold text-slate-900 mb-1">{stats.afaps.aprobados}</p>
            <p className="text-xs text-slate-500">Habilitaciones otorgadas</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">En Inspección</p>
              <ClipboardCheck className="w-5 h-5 text-violet-600" />
            </div>
            <p className="text-4xl font-bold text-slate-900 mb-1">{stats.afaps.en_inspeccion}</p>
            <p className="text-xs text-slate-500">Proceso de verificación</p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Inspecciones</p>
                <p className="text-2xl font-bold text-slate-900">{stats.inspecciones.programadas}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">Programadas</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Inspecciones</p>
                <p className="text-2xl font-bold text-slate-900">{stats.inspecciones.completadas}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">Completadas</p>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-white p-6 rounded-xl border border-violet-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Usuarios</p>
                <p className="text-2xl font-bold text-slate-900">{stats.usuarios.total}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">Registrados en el sistema</p>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Distribución por Estado</h2>
          <div className="space-y-4">
            {[
              { label: 'Aprobados', value: stats.afaps.aprobados, total: stats.afaps.total, color: 'bg-emerald-600' },
              { label: 'En Inspección', value: stats.afaps.en_inspeccion, total: stats.afaps.total, color: 'bg-blue-600' },
              { label: 'Pendientes', value: stats.afaps.pendientes, total: stats.afaps.total, color: 'bg-amber-600' },
              { label: 'Rechazados', value: stats.afaps.rechazados, total: stats.afaps.total, color: 'bg-red-600' },
            ].map((item) => {
              const percentage = stats.afaps.total > 0 ? (item.value / item.total) * 100 : 0;
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900">{item.value} ({percentage.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        {stats.recent_afaps && stats.recent_afaps.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Actividad Reciente</h2>
            <div className="space-y-4">
              {stats.recent_afaps.map((afap) => (
                <div
                  key={afap.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Habilitación Precaria #{afap.numero_afap}</p>
                      <p className="text-sm text-slate-600">
                        {afap.solicitante_nombre} {afap.solicitante_apellido}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">{afap.estado}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(afap.fecha_solicitud).toLocaleDateString('es-AR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};