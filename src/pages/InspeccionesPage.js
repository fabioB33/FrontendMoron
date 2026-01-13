import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import api from '../utils/api';
import { Button } from '../components/ui/button';
import { Calendar, Clock, CheckCircle, MapPin, FileText } from 'lucide-react';
import { toast } from 'sonner';

export const InspeccionesPage = () => {
  const [inspecciones, setInspecciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInspecciones();
  }, []);

  const loadInspecciones = async () => {
    try {
      const response = await api.get('/inspecciones');
      setInspecciones(response.data);
    } catch (error) {
      console.error('Error loading inspecciones:', error);
      toast.error('Error al cargar las inspecciones');
    } finally {
      setLoading(false);
    }
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      programada: {
        color: 'text-blue-700 bg-blue-50 border-blue-200',
        icon: Calendar,
        label: 'Programada'
      },
      completada: {
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        icon: CheckCircle,
        label: 'Completada'
      },
      cancelada: {
        color: 'text-red-700 bg-red-50 border-red-200',
        icon: Clock,
        label: 'Cancelada'
      }
    };

    const badge = badges[estado] || badges.programada;
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
      <div data-testid="inspecciones-page" className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Inspecciones</h1>
          <p className="text-slate-600">Gestión de inspecciones programadas y completadas</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Programadas</p>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {inspecciones.filter(i => i.estado === 'programada').length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Completadas</p>
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {inspecciones.filter(i => i.estado === 'completada').length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-600">Total</p>
              <FileText className="w-5 h-5 text-slate-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{inspecciones.length}</p>
          </div>
        </div>

        {/* Inspecciones List */}
        <div className="space-y-4">
          {inspecciones.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">
              <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No hay inspecciones programadas</h3>
              <p className="text-slate-600">Las inspecciones aparecerán aquí cuando se programen</p>
            </div>
          ) : (
            inspecciones.map((inspeccion) => (
              <div
                key={inspeccion.id}
                data-testid={`inspeccion-card-${inspeccion.id}`}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">Habilitación Precaria #{inspeccion.afap_id}</h3>
                      {getEstadoBadge(inspeccion.estado)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Fecha Programada</p>
                    <p className="text-sm font-medium text-slate-900">
                      {new Date(inspeccion.fecha_programada).toLocaleDateString('es-AR')}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Inspector Asignado</p>
                    <p className="text-sm font-medium text-slate-900">{inspeccion.inspector_id}</p>
                  </div>

                  {inspeccion.fecha_realizada && (
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Fecha Realizada</p>
                      <p className="text-sm font-medium text-slate-900">
                        {new Date(inspeccion.fecha_realizada).toLocaleDateString('es-AR')}
                      </p>
                    </div>
                  )}
                </div>

                {inspeccion.observaciones && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Observaciones:</strong> {inspeccion.observaciones}
                    </p>
                  </div>
                )}

                {inspeccion.resultado && (
                  <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-sm text-emerald-900">
                      <strong>Resultado:</strong> {inspeccion.resultado}
                    </p>
                    {inspeccion.notas && (
                      <p className="text-sm text-emerald-800 mt-2">{inspeccion.notas}</p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};